import { getNakedGroups } from "./analyzer/getNakedGroups.js";
import { getHiddenGroups } from "./analyzer/getHiddenGroups.js";
import { excludeCandidates } from "./analyzer/excludeCandidates.js";
import { nakedPairMap } from "../tests/inputData/nakedGroupsData.test.js";

function analyzeCandidates(obj, map) {

  const { arr: complex, arrX, arrY } = obj.objToCheck;

  const comb = getNakedGroups(complex);
  // const comb = getHiddenGroups(complex);
  console.log(comb);

  if (comb !== null) excludeCandidates(complex, comb);

  // console.log(complex);

}

analyzeCandidates(nakedPairMap);