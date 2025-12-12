import { inArray, notInArray } from '../helpers.js';

export function excludeCandidates(cplx, comb) {
  if (comb.type === 'naked') {

    const exceptNakedGroups = cplx.filter(notInArray(comb.group));

    for (const elem of exceptNakedGroups) {

      if (!Array.isArray(elem.value)) continue;

      const resultValue = elem.value.filter(notInArray(comb.candidates));
      elem.value = resultValue.length === 1 ? resultValue[0] : resultValue;
    }
  }
  if (comb.type === 'hidden') {

    for (const elem of comb.group) {

      const resultValue = elem.value.filter(inArray(comb.candidates));

      elem.value = resultValue;
    }
  }
}