const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { createInterface } = require('readline/promises');
const { pipeline } = require('stream/promises');

const extensionMap = {
  documents: ['.doc', '.docx', '.odt', '.pdf', '.rtf', '.tex', '.txt', '.wks', '.wps', '.wpd'],
  spreadsheets: ['.xls', '.xlsx', '.xlsm', '.ods', '.csv', '.tsv'],
  presentations: ['.ppt', '.pptx', '.pps', '.odp'],
  images: ['.ai', '.bmp', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.ps', '.psd', '.svg', '.tif', '.tiff'],
  audio: ['.aif', '.cda', '.mid', '.midi', '.mp3', '.mpa', '.ogg', '.wav', '.wma', '.wpl'],
  video: ['.3g2', '.3gp', '.avi', '.flv', '.h264', '.m4v', '.mkv', '.mov', '.mp4', '.mpg', '.mpeg', '.rm', '.swf', '.vob', '.wmv'],
  archives: ['.7z', '.arj', '.deb', '.pkg', '.rar', '.rpm', '.tar.gz', '.z', '.zip'],
  code: ['.c', '.class', '.cpp', '.cs', '.h', '.java', '.py', '.sh', '.swift', '.js', '.ts', '.html', '.css', '.json', '.xml', '.md'],
  fonts: ['.fnt', '.fon', '.otf', '.ttf', 'woff', '.woff2'],
  '3d': ['.3dm', '.3ds', '.max', '.obj'],
  databases: ['.accdb', '.db', '.dbf', '.mdb', '.pdb', '.sql'],
  executables: ['.apk', '.app', '.bat', '.com', '.exe', '.gadget', '.jar', '.msi', '.wsf'],
  hidden: ['.hidden'],
  other: []
};

// пути к исходной/целевой папкам, а также необходимость удаления исходной,
// передаются в виде аргументов командной строки
// boolean === true - режим перемещения;
// boolean === false - режим копирования;
const userInput = process.argv.slice(2);

async function validateUserInput(args) {

  // Проверяем количество аргументов
  if (args.length !== 3) {
    throw new Error('Ошибка: требуется ровно 3 аргумента: <sourceDir> <outputDir> <boolean>');
  }

  const [sourceDir, outputDir, sourceDirIsDelete] = args;

  // Валидация путей к папкам
  const validateFolderPath = async (folderPath, argName) => {

    if (!folderPath || folderPath.trim() === '') {
      throw new Error(`Ошибка: ${argName} не может быть пустым`);
    }

    // Проверка корректности пути
    let resolvedPath;
    try {
      resolvedPath = path.resolve(folderPath);
    } catch (err) {
      throw new Error(`Ошибка: некорректный формат пути в ${argName}: ${folderPath}`);
    }

    // Проверка существования папки
    try {
      const stats = await getStat(folderPath);
      if (!stats.isDirectory()) {
        throw new Error(`Ошибка: ${argName} должен указывать на папку, а не файл: ${folderPath}`);
      }
    } catch (err) {
      throw err;
    }

    return resolvedPath;
  }

  const sourceFolder = await validateFolderPath(sourceDir, 'Первый аргумент');
  const outputFolder = await validateFolderPath(outputDir, 'Второй аргумент');

  const currentPath = sourceFolder;

  // Валидация булевого значения
  const booleanMap = {
    'true': true,
    'false': false,
    '1': true,
    '0': false
  };

  if (!(sourceDirIsDelete in booleanMap)) {
    throw new Error('Ошибка: третий аргумент должен быть true/false или 1/0');
  }

  const booleanValue = booleanMap[sourceDirIsDelete];

  return { sourceFolder, outputFolder, currentPath, booleanValue };
}

async function promptUser(userQuestion) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const answer = await rl.question(userQuestion);
    const normalizedAnswer = (answer || '').trim().toLowerCase();
    const isYes = normalizedAnswer === 'y' || normalizedAnswer === 'yes';

    return isYes;
  } catch (err) {
    throw new Error('Ошибка ввода/вывода readline', err.message);
  } finally {
    rl.close();
  }
}

async function getStat(path) {
  try {
    return await fsp.stat(path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      const shouldCreate = await promptUser(`Такой папки не существует: ${path}. Создать директорию? (y/n): `);
      if (shouldCreate) {
        await fsp.mkdir(path, { recursive: true });
        console.log(`Директория ${path} успешно создана`);

        return await fsp.stat(path);
      } else {
        throw new Error(`Директория ${path} не создана. Операция отменена пользователем.`);
      }
    } else {
      throw new Error(`Ошибка получения статистики для ${path}: ${err.message}`);
    }
  }
}

async function copyRecursive(data, results) {
  try {
    const base = data.currentPath;

    const items = await fsp.readdir(base, { withFileTypes: true }); // массив имен внутри директории

    for (const item of items) {

      const localBase = path.join(base, item.name);

      const state = await getStat(localBase);

      const isDir = state.isDirectory();
      const isFile = state.isFile();

      data.currentPath = localBase;
      data.currentName = item.name;

      if (isDir) {
        // если папка, рекурсивно вызвать copyRecursive
        await copyRecursive(data, results);
      }
      else if (isFile) {
        // если файл, приступить к систематизации
        await processFiles(data, results);
      }
    }
  } catch (err) {
    console.log('Ошибка рекурсивного копирования', err.message);
    throw err;
  }
}

function getFileExtension(fileName) {
  try {
    // если файл начинается с точки, отправить в папку hidden
    if (fileName.startsWith('.')) return '.hidden';
    else return path.extname(fileName).toLowerCase();
  } catch (err) {
    throw new Error(`Ошибка получения расширения ${fileName}: ${err.message}`);
  }
}

function getFolderExtension(extension) {
  for (const [key, values] of Object.entries(extensionMap)) {
    const inExtensionMap = values.some(item => item === extension);
    // если расширение находится в extensionMap, вернуть директорию,
    // которой она принадлежит 
    if (inExtensionMap) return key;
  }
  // иначе сбросить в папку other
  return 'other';
}

function isLetterUnicode(char) {
  return /^\p{L}$/u.test(char);
}

async function directoryExists(dirPath) {
  try {
    await fsp.access(dirPath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readPermission(srcPath) {
  try {
    await fsp.access(srcPath, fs.constants.R_OK);
    return true;
  } catch (accessError) {
    throw new Error(`Нет прав на чтение файла: ${srcPath}`);
  }
}

async function copyWithPipeline(src, dest) {
  try {
    // создаем временный файл (чтобы избежать проверок на чтение/запись)
    const tempDest = dest + '.tmp';

    const rs = fs.createReadStream(src);
    const ws = fs.createWriteStream(tempDest);

    await pipeline(rs, ws);

    await fsp.rename(tempDest, dest); // если все прошло успешно, переименовать

    return { success: true, file: src };
  } catch (error) {
    try {
      await fsp.unlink(dest + '.tmp') // удалить временный файл, если создался
    } catch (err) {
      console.log('Ошибка удаления временного файла:', dest);
      throw err;
    }
    // pipeline() при ошибке закрывает все потоки автоматически
    return {
      success: false,
      file: src,
      error,
      errorMessage: error.message
    };
  }
}

async function copyWithHandlePromisify(src, dest) {
  return new Promise((resolve, reject) => {

    // создать поток чтения
    const rs = fs.createReadStream(src);
    // создать поток записи
    const ws = fs.createWriteStream(dest);

    rs.on('error', error => {
      reject({
        success: false,
        file: src,
        error,
        errorMessage: `Ошибка чтения файла: ${error.message}`
      });
    });

    ws.on('error', error => {
      rs.destroy(); // при ошибки записи, закрыть поток чтения
      reject({
        success: false,
        file: src,
        error,
        errorMessage: `Ошибка записи файла: ${error.message}`
      });
    });

    ws.on('finish', () => {
      resolve({ success: true, file: src });
    });

    rs.pipe(ws);
  });
}

async function processFiles(data, results) {
  try {
    const { currentPath: filePath, outputFolder, currentName: name } = data;

    const fileExtension = getFileExtension(name);

    if (fileExtension === '') return;

    const folderName = getFolderExtension(fileExtension);

    // создаём основную директорию по расширению файла, если она не существует
    const mainDir = path.join(outputFolder, folderName);
    const mainDirIsExist = await directoryExists(mainDir);

    if (!mainDirIsExist) await fsp.mkdir(mainDir);

    let firstChar = name[0];
    if (isLetterUnicode(firstChar) || firstChar === '.') firstChar = firstChar.toUpperCase();
    else firstChar = 'needs-review';

    // создаём поддиректорию по первой букве имени файла, если она не существует
    const subDirPath = path.join(mainDir, firstChar);
    const subDirIsExist = await directoryExists(subDirPath);
    if (!subDirIsExist) await fsp.mkdir(subDirPath);

    const destPathToFile = path.join(subDirPath, name);

    const result = await copyWithPipeline(filePath, destPathToFile);

    if (result.success === true) console.log(`Файл ${name} успешно скопирован`);
    else console.log(`Ошибка копирования файла: ${name}`);

    results.push(result);
  } catch (err) {
    console.log('Ошибка обработки файлов', err.message);
    throw err;
  }
}

async function deleteFolder(folderPath) {
  try {
    await fsp.rm(folderPath, {
      recursive: true,  // рекурсивно удаляет вложенные папки и файлы
      force: true      // игнорирует ошибки, если файл/папка не существует
    });
    console.log(`Исходная папка ${folderPath} успешно удалена`);
  } catch (err) {
    console.error(`Ошибка при удалении папки ${folderPath}:`, err.message);
  }
}

async function deleteFolderWithRmdir(folderPath) {
  try {
    await fs.rmdir(folderPath, { recursive: true });
    console.log(`Папка ${folderPath} удалена через rmdir`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`Папка ${folderPath} уже удалена`);
    } else {
      console.error('Ошибка:', err);
    }
  }
}

(async () => {
  try {
    // проверить входные данные (исходная папка, папка назначения и т.д.)
    const validatedData = await validateUserInput(userInput);

    // массив результатов копирования
    const copyResults = [];

    // рекурсивно скопировать файлы из исходной папки
    await copyRecursive(validatedData, copyResults);

    const allCopied = copyResults.every(result => result.success);

    // режим перемещения, при условии, что все файлы удачно скопированы
    if (validatedData.booleanValue === true) {
      if (allCopied === true) {
        await deleteFolder(validatedData.sourceFolder); // удалить исходники
        console.log("Файлы успешно перемещены");
      } else console.log("Не все файлы скопированы. Операция перемещения прервана.");
    }

    // режим копирования
    if (validatedData.booleanValue === false) {
      if (allCopied === true) console.log("Файлы успешно скопированы");
      else console.log("Не все файлы скопированы!");
    };
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();