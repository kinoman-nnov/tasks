import './css/style.css';
import chart from './module';

const frForm = document.querySelector('#myForm');
const button = document.querySelector('#loadButton');
const result = document.querySelector('#result');

// const result = document.querySelector('.result');

let arrayFr = []; // массив частот
let startFr;  // нижняя частота
let endFr;  // верхняя частота
let frheterodyne; // гетеродин
let frIntermediate;	// массив ПЧ
let combNumber; // комбинация верна

const n = [2, 3, 4];
const m = [2, 3, 4];

function getFrIntermediateArray() {  // функция возвращает массив ПЧ в зависимости от частоты гетеродина 

  if (arrayFr[0] >= frheterodyne) {
    frIntermediate = arrayFr.map(function (num) {
      return +(num - frheterodyne).toFixed(1);
    });
  } else {
    frIntermediate = arrayFr.map(function (num) {
      return +(frheterodyne - num).toFixed(1);
    }).reverse();
  }

  return frIntermediate;
}

function getCombinationFr() {	// ф-ция собирает в массивы комбинационные частоты 3-го порядка
  let getCombObj = {};

  let arrayComb = arrayFr.map(function (num) {
    let combIII = ((2 * frheterodyne) - num).toFixed(1);
    return combIII;
  });
  let arrayCombII = arrayFr.map(function (num) {
    let combIII2 = ((2 * num) - frheterodyne).toFixed(1);
    return combIII2;
  });
  getCombObj.combFrIII = arrayComb;
  getCombObj.combFrIII2 = arrayCombII;
  return getCombObj;
}

button.addEventListener('click', function (event) {
  event.preventDefault();
  result.textContent = "";

  startFr = Number(frForm.elements.inputStartF.value);	// нижняя входная F  
  endFr = Number(frForm.elements.inputEndF.value);	// верхняя входная F
  frheterodyne = Number(frForm.elements.inputHeterodyne.value);	// гетеродин

  let div = endFr - startFr + 1;
  if ((div > 0) && (div !== 0)) {
    for (let i = 0; i < div; i++) {
      arrayFr.push(startFr);
      startFr += 1;
    }
    console.log("массив входных частот", arrayFr); // массив частот

    let resultFrIntermediate = (getFrIntermediateArray(arrayFr)); console.log("массив ПЧ частот", resultFrIntermediate);
    let resultCombinationFr = getCombinationFr(arrayFr); console.log("массивы комбинационных частот", resultCombinationFr);

    const resultFr = document.createElement('div');
    result.appendChild(resultFr);
    resultFr.textContent = `Массив входных частот [${arrayFr}]`;

    const resultFrInter = document.createElement('div');
    result.appendChild(resultFrInter);
    resultFrInter.textContent = `Массив ПЧ частот [${resultFrIntermediate}]`;

    const resultFrComb = document.createElement('div');
    result.appendChild(resultFrComb);
    resultFrComb.textContent = `Массивы комбинационных частот 3го порядка[${resultCombinationFr.combFrIII}] и [${resultCombinationFr.combFrIII2}]`;

    chart(arrayFr, div);
  }
  arrayFr = [];
});