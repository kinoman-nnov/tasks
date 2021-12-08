import { getLabels, getDataArr } from "./utils";

let createChart = (obj) => {

  const ctx = document.querySelector('.myChart');

  let maxCount;; // задает max значения по оси Х [-x, +x]
  if (obj.dataForm.endFr > obj.dataForm.frHeterodyne) {
    maxCount = (2 * obj.dataForm.endFr);
  } else if (obj.dataForm.frHeterodyne > obj.dataForm.endFr) {
    maxCount = (2 * obj.dataForm.frHeterodyne);
  }

  const countObj = {
    count: maxCount,
    min: -100,
    max: 100
  };

  const coordsX = getLabels(countObj); // коор - ты по оси Х

  const dataInput = getDataArr(coordsX, obj.arrayFr); // массив объектов с коор - тами входных чвстот
  const dataInter = getDataArr(coordsX, obj.interFr); // массив объектов с коор - тами ПЧ чвстот
  const dataCombIII = getDataArr(coordsX, obj.combFr.combFrIII); // массив объектов с коор - тами комбинационных чвстот
  // const dataCombIII2 = getDataArr(coordsX, frComb.combFrIII2); // массив объектов с коор - тами комбинационных чвстот

  const data = {
    labels: coordsX,
    datasets: [{
      label: 'Input',
      data: dataInput,
      backgroundColor: [
        'rgba(24, 30, 214, 0.2)',
      ],
      borderColor: [
        'rgba(24, 30, 214, 1)',
      ],
      borderWidth: 2,
      stack: 'combined',
    },
    {
      label: 'Inter',
      data: dataInter,
      backgroundColor: [
        'rgba(255, 255, 255, 0.2)',
      ],
      borderColor: [
        'rgba(0, 0, 0, 0.5)',
      ],
      borderWidth: 2,
      stack: 'combined',
    },
    {
      label: 'CombIII',
      data: dataCombIII,
      backgroundColor: [
        'rgba(217, 47, 47, 0.2)',
      ],
      borderColor: [
        'rgba(217, 47, 47, 1)',
      ],
      borderWidth: 2,
      stack: 'combined',
    },
    {
      label: 'CombIII2',
      data: dataCombIII,
      backgroundColor: [
        'rgba(217, 47, 47, 0.2)',
      ],
      borderColor: [
        'rgba(217, 47, 47, 1)',
      ],
      borderWidth: 2,
      stack: 'combined',
    }]
  }

  const decimation = {
    enabled: false,
    algorithm: 'min-max',
  };
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'linear',
          display: true,
          // position: 'center',
        },
        y: {
          type: 'linear',
          display: true,
          position: 'center',
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Графики'
        },
        decimation: decimation,
      },
    }
  };

  new Chart(
    ctx,
    config
  );
}

export default createChart;