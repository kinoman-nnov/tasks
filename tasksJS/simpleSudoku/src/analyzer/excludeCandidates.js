import { inArray, notInArray, accessToProp } from '../helpers.js';

export function excludeCandidates(cplx, comb, map) {
  try {
    if (comb.type === 'naked') {

      const exceptNakedGroups = cplx.filter(notInArray(comb.group));

      for (const elem of exceptNakedGroups) {

        if (!Array.isArray(elem.value)) continue;

        const resultValue = elem.value.filter(notInArray(comb.candidates));

        if (resultValue.length == 0) throw new Error(comb.type);

        elem.value = resultValue.length == 1 ? resultValue[0] : resultValue;
      }
    }
    if (comb.type === 'hidden') {

      for (const elem of comb.group) {

        if (!Array.isArray(elem.value)) continue;

        const resultValue = elem.value.filter(inArray(comb.candidates));

        if (resultValue.length == 0) throw new Error(comb.type);

        elem.value = resultValue.length == 1 ? resultValue[0] : resultValue;
      }
    }
    if (comb.type === 'pointing') {

      for (const pointingGroup of comb.group) {

        for (const [address, arr] of Object.entries(pointingGroup)) {

          const regexpX = /sectionX/;
          const regexpY = /sectionY/;

          let complex;

          if (regexpX.test(address)) {

            // ряд по X
            complex = accessToProp(map.x, address);

          } else if (regexpY.test(address)) {

            // колонка по Y
            complex = accessToProp(map.y, address);
          } else throw new Error('Что-то пошло не так, не найдена секция в excludeCandidates.js');

          const groupInnerTableId = arr[0].address.innerTableId;

          // исключить указывающую группу из arrx/arrY
          const exceptPointingGroupInLine = complex.filter(notInArray(arr));
          // исключить указывающую группу из таблицы
          const exceptPointingGroupInTable = map.mainTable[groupInnerTableId].filter(notInArray(arr));

          // добавить в один массив таблицу и строку/колонку без указывающей группы
          const cplxComplicated = [...exceptPointingGroupInLine, ...exceptPointingGroupInTable];

          const candidate = comb.candidates[address];

          for (const elem of cplxComplicated) {

            if (!Array.isArray(elem.value)) continue;

            // удалить кандидата из ячеек
            const resultValue = elem.value.filter(notInArray(candidate));

            if (resultValue.length == 0) throw new Error(comb.type);

            elem.value = resultValue.length == 1 ? resultValue[0] : resultValue;
          }
        }
      }
    }
    if (comb.type === 'hiddenSingle') {

      if (comb.candidates.length == 0) throw new Error(comb.type);

      comb.group.value = comb.candidates[0];
    }

  } catch (err) {

    throw err;
  }

  return map;
}