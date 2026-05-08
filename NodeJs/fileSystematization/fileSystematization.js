const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

// пути к исходной/целевой папкам, а также необходимость удаления исходной
// передаются в виде аргументов командной строки
const userInput = process.argv.slice(2);

const validateUserInput = async (args) => {

  // Проверяем количество аргументов
  if (args.length !== 3) {
    console.error('Ошибка: требуется ровно 3 аргумента: <sourceDir> <outputDir> <boolean>');
    process.exit(1);
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

  return { sourceFolder, outputFolder, booleanValue }
}

async function getStat(path) {
  try {
    const stats = await fsp.stat(path);
    return stats;
  } catch (err) {
    throw new Error(`Ошибка получения статистики для ${path}: ${err.message}`);
  }
}

async function readDir(base) {

  const items = await fsp.readdir(base, { withFileTypes: true }); // массив имен внутри директории

  for (const item of items) {

    const localBase = path.join(base, item.name);

    const state = await getStat(localBase);

    const isDir = state.isDirectory();
    const isFile = state.isFile();

    if (isDir) {

      // если директория, рекурсивно вызвать readDir
      readDir(localBase);
    }
    else if (isFile) {

      // если файл, приступить к систематизации
      copyFile(localBase, item.name);
    }
  }
}

function copyFile(localPath, name) {
  // создать поток чтения
  const rs = fs.createReadStream(localPath);
  // создать поток записи
  const ws = fs.createWriteStream('./outputDir/text.txt');

  rs.pipe(ws);

  rs.on('data', chunk => console.log('end', name));
}

try {
  (async () => {

    const validatedData = await validateUserInput(userInput);

    console.log(validatedData);
    await readDir(validatedData.sourceFolder);
  })();

} catch (error) {

  console.error(error.message);
  process.exit(1);
}