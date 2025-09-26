import { inArray, notInArray, groupBy } from './helpers.js';

function analyzeCandidates(obj, applicants, map) {

  const { objToCheck, arrX, arrY } = obj;

  // если ячейка пустая (null) или нет возможных кандидатов, прекратить выполнение
  if (!Array.isArray(objToCheck.cell.value) || applicants.length < 2) return applicants;

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
      if (getArraysCandidatesInLine.length < 2) return applicants;

    // если массивов с кандидатами 2 и более в одной группе
    // иследовать таблицы, к которым они принадлежат

    // сгруппировать массивы с кандидатами по Id таблиц, к которым они принадлежат
    const groupByTableId = groupBy(getArraysCandidatesInLine, 'address.innerTableId');

    // массив с группами кандидатов
    const groupsCandidates = [];
    for (const arr of Object.entries(groupByTableId)) {
      const candidatesTableId = arr[0];
      const arraysCandidates = arr[1];

      const candidatesTable = map.mainTable[candidatesTableId];

      groupsCandidates.push({ candidatesTable, arraysCandidates });
    }

    // перебрать все группы и вывести массивы кандидатов на исключение
    const getCandidatesForExclusion = [];
    for (const group of groupsCandidates) {

      // проверить на наличие null в таблице
      // если null найден, исключить кандидатов не удастся, прервать выполнение
      const hasNoNull = group.candidatesTable.every(element => element.value !== null);
      if (!hasNoNull) return applicants;

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

    const result = applicants.filter(notInArray(getArrForExclusion(getCandidatesForExclusion)));

    if (result.length == 0) return applicants;
    
    return result;
  }

  applicants = excludeCandidatesInLine(arrX);

  applicants = excludeCandidatesInLine(arrY);

  return applicants;
}

export { analyzeCandidates }