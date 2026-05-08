function analyzeCandidates(obj, applicants, map) {

  const { objToCheck, arrX } = obj;

  // если ячейка пустая (null) или нет возможных кандидатов, прекратить выполнение
  if (!Array.isArray(objToCheck.cell.value) || applicants.length < 2) return;

  const tableIdToCheck = objToCheck.cell.address.innerTableId;

  // сократить число возможных кандидатов
  const excludeCandidatesInLine = (arr) => {

    // иследовать ряд на массивы с возможными кандидатами
    // найти массивы с возможными кандидатами на исключение
    const getArraysCandidatesInLine = arr
      .filter((item) => {
        if (!Array.isArray(item.value)) return;

        // исключить сравнение текущего элемента с самим собой
        if (item == objToCheck.cell) return;

        // исключить ячейки внутри одной таблицы с рассматриваемой
        if (tableIdToCheck == item.address.innerTableId) return;

        // массив совпадений с кандидатами
        const arrDuplicates = item.value.filter(inArray(applicants));

        if (arrDuplicates.length == 0) return;

        return item;
      })
      // исключить ячейки с кандидатами внутри разных таблиц
      .filter((item, idx, arr) => {

        // сравнить массивы между собой
        for (const elem of arr) {

          if (item == elem) continue;

          if (item.address.innerTableId == elem.address.innerTableId) return item;
        }
        return;
      });

    // если массивов с возможными кандидатами в одной группе меньше двух, прекратить выполнение
    if (getArraysCandidatesInLine.length < 2) return;

    // если массивов с кандидатами 2 и более в одной группе
    // иследовать таблицы, к которым они принадлежат

    // сгруппировать массивы с кандидатами по Id таблиц, к которым они принадлежат
    const groupByTableId = groupBy(getArraysCandidatesInLine, 'address.innerTableId');

    console.log(groupByTableId[2]);
    // массив с группами кандидатов
    const groupsCandidates = [];
    for (const arr of Object.entries(groupByTableId)) {
      const candidatesTableId = arr[0];
      const arraysCandidates = arr[1];

      const candidatesTable = map.mainTable[candidatesTableId];

      groupsCandidates.push({ candidatesTable, arraysCandidates });
    }

    const getCandidatesForExclusion = [];
    for (const group of groupsCandidates) {

      // проверить на наличие null в таблице
      // если null найден, исключить кандидатов не удастся, превать выполнение
      const hasNoNull = group.candidatesTable.every(element => element.value !== null);
      if (!hasNoNull) return;

      // удалить массивы с кандидатами (group.arraysCandidates) из таблицы
      const exceptCandidatesInTable = group.candidatesTable.filter(notInArray(group.arraysCandidates));

      // исключить кандидата из массивов (group.arraysCandidates), если он присутсвует в таблице
      const candidatesForExclusionInGroup = group.arraysCandidates
        .map(elem => elem.value
          .filter((item) => {
            for (const cell of exceptCandidatesInTable) {

              // если число в таблице совпало с кандидатом, исключить кандидата из массива
              if (item === cell.value) return;

              // если массив, сравнить поэлементно, исключить совпадения 
              else if (Array.isArray(cell.value)) {
                if (cell.value.includes(item)) return;
              }
            }

            return item;
          })
        );
        getCandidatesForExclusion.push(...candidatesForExclusionInGroup);
    }
    console.log(getCandidatesForExclusion);
    
    // возвращает массив чисел, которых надо исключить из кандидатов
    const getArrForExclusion = (complexArray) => {
      const cache = new Set;
      const arrForExclusion = [];
      // let exampleArr = [[9], [9, 111], [9,4,4]];
      // [...new Set(item)] исключает дублирование внутри одного массива
      complexArray.filter(item => [...new Set(item)].forEach(elem => {
        if (typeof elem != 'number') return;
        if (!cache.has(elem)) cache.add(elem);
        else arrForExclusion.push(elem);
      }));
      return arrForExclusion;
    }

    return applicants.filter(notInArray(getArrForExclusion(getCandidatesForExclusion)));
  }

  applicants = excludeCandidatesInLine(arrX);
  // applicants = excludeCandidatesInLine(arrY);

  return applicants;
}

function accessToProp(obj, path) {
  // accumulator = key, currentValue из массива = prop, initialValue = obj
  return path.split('.').reduce((key, prop) => key[prop], obj);
}

function groupBy(arr, key) {
  return arr.reduce(function (acc, i) {
    (acc[accessToProp(i, key)] = acc[accessToProp(i, key)] || []).push(i);
    return acc;
  }, {});
}

function inArray(array) {
  return function (x) {
    return array.includes(x);
  };
}

function notInArray(array) {
  return function (x) {
    return !array.includes(x);
  }
}

let arrX = [
  { value: 7, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column0', innerTableId: 0 } },
  { value: 3, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column1', innerTableId: 0 } },
  { value: [6, 9], address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column2', innerTableId: 0 } },
  { value: 8, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column0', innerTableId: 1 } },
  { value: 4, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column1', innerTableId: 1 } },
  { value: 1, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column2', innerTableId: 1 } },
  { value: [5, 6, 9], address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column0', innerTableId: 2 } },
  { value: [5, 6, 9], address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column1', innerTableId: 2 } },
  { value: 2, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column2', innerTableId: 2 } }
];

let objToCheck = {
  arr: [
    { value: 7, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column0', innerTableId: 0 } },
    { value: 3, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column1', innerTableId: 0 } },
    { value: [6, 9], address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column2', innerTableId: 0 } },
    { value: 2, address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column0', innerTableId: 0 } },
    { value: [1, 5, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column1', innerTableId: 0 } },
    { value: 4, address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column2', innerTableId: 0 } },
    { value: 8, address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column0', innerTableId: 0 } },
    { value: [1, 5, 6, 9], address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column1', innerTableId: 0 } },
    { value: [1, 6, 9], address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column2', innerTableId: 0 } }
  ],
  // cell: {
  //   address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column2', innerTableId: 0 },
  //   value: [6, 9]
  // }
}

const numbersMap = {
  mainTable: {
    0: 1,
    1: [
      arrX[3], arrX[4], arrX[5],
      { value: [5, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 6, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 3, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column2', innerTableId: 1 } },
      { value: [5, 9], address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 2, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 7, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column2', innerTableId: 1 } }
    ],
    2: [
      arrX[6], arrX[7], arrX[8],
      { value: 8, address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: [1, 5, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: 7, address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column2', innerTableId: 2 } },
      { value: 4, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 3, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: [1, 5], address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column2', innerTableId: 2 } }
    ]
  }
};
objToCheck.cell = arrX[2];

const arrayApplicants = objToCheck.arr[2].value;

console.log(analyzeCandidates({ objToCheck, arrX }, arrayApplicants, numbersMap));