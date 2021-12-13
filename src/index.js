import './css/style.css';
import chart from './module';

const frForm = document.querySelector('#myForm');
const button = document.querySelector('#loadButton');
const result = document.querySelector('#result');
const chartContainer = document.querySelector('.chart-container');

let startFr;  // нижняя частота
let endFr;  // верхняя частота
let dif;  // диапазон
let frHeterodyne; // гетеродин
let frIntermediate;	// массив ПЧ
let canvas; // дом-узел с графиком

const n = [2, 3, 4];
const m = [2, 3, 4];

function getInputFrArray(arrayFr) {  // функция возвращает массив входных частот 

  for (let i = 0; i < dif; i++) {
    arrayFr.push(+startFr.toFixed(1));
    startFr += 1;
  }

  return frIntermediate;
}

function getFrIntermediateArray(arrayFr) {  // функция возвращает массив ПЧ в зависимости от частоты гетеродина 

  if (arrayFr[0] >= frHeterodyne) {
    frIntermediate = arrayFr.map(function (num) {
      return +(num - frHeterodyne).toFixed(1);
    });
  } else {
    frIntermediate = arrayFr.map(function (num) {
      return +(frHeterodyne - num).toFixed(1);
    }).reverse();
  }

  return frIntermediate;
}

function getCombinationFr(arrayFr) {	// ф-ция собирает в массивы комбинационные частоты 3-го порядка
  let getCombObj = {};

  let arrayComb = arrayFr.map(function (num) {
    let combIII = ((2 * frHeterodyne) - num).toFixed(1);

    return +combIII;
  });
  let arrayCombII = arrayFr.map(function (num) {
    let combIII2 = ((2 * num) - frHeterodyne).toFixed(1);

    return +combIII2;
  });
  getCombObj.combFrIII = arrayComb.reverse();
  getCombObj.combFrIII2 = arrayCombII;

  return getCombObj;
}

button.addEventListener('click', function (event) {
  event.preventDefault();
  result.innerHTML = "";
  let arrayFr = []; // массив входных частот
  let objData = {}; // объект с данными
  let objInputForm = {}; // объект данных из формы

  if (chartContainer.contains(canvas)) {
    canvas.remove()
  }

  startFr = Number(frForm.elements.inputStartF.value);	// нижняя входная F  
  endFr = Number(frForm.elements.inputEndF.value);	// верхняя входная F
  frHeterodyne = Number(frForm.elements.inputHeterodyne.value);	// гетеродин

  objInputForm.startFr = startFr;
  objInputForm.endFr = endFr;
  objInputForm.frHeterodyne = frHeterodyne;
  
  objData.dataForm = objInputForm;

  dif = endFr - startFr + 1; // диапазон

  if ((dif > 0) && (dif !== 0)) {

    getInputFrArray(arrayFr);

    console.log("массив входных частот", arrayFr); // массив частот

    let resultFrIntermediate = getFrIntermediateArray(arrayFr); console.log("массив ПЧ частот", resultFrIntermediate);
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

    canvas = document.createElement('canvas');
    chartContainer.appendChild(canvas);
    canvas.classList.add('myChart');
    
    objData.arrayFr = arrayFr;
    objData.interFr = resultFrIntermediate;
    objData.combFr = resultCombinationFr;

    chart(objData);
  }
});