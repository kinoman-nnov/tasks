import { getLabels, getDataArr } from "./utils"

let createChart = (arrFr, frInter, frComb) => {

  const ctx = document.querySelector('.myChart');

  const dataCount = 15; // задает max значения по оси Х [-x, +x]
  
  const dataObj = {
    count: dataCount,
    min: -100,
    max: 100
  };

  const coordsX = getLabels(dataObj); // коор - ты по оси Х
  const dataInput = getDataArr(coordsX, arrFr); // массив объектов с коор - тами входных чвстот
  const dataInter = getDataArr(coordsX, frInter); // массив объектов с коор - тами ПЧ чвстот
  const dataCombIII = getDataArr(coordsX, frComb.combFrIII); // массив объектов с коор - тами комбинационных чвстот
  // const dataCombIII2 = getDataArr(coordsX, frComb.combFrIII2); // массив объектов с коор - тами комбинационных чвстот
console.log(dataCombIII2);
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
      data: dataCombIII2,
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
        }
      },
    }
  };

  new Chart(
    ctx,
    config
  );
}

export default createChart;


// import {numbers, months, CHART_COLORS} from './utils';
// const ctx = document.getElementById('myChart');

// // <block:actions:2>
// const actions = [
//   {
//     name: 'Randomize',
//     handler(chart) {
//       chart.data.datasets.forEach(dataset => {
//         dataset.data = numbers({ count: chart.data.labels.length, min: -100, max: 100 });
//       });
//       chart.update();
//     }
//   },
// ];
// // </block:actions>

// // <block:setup:1>
// const DATA_COUNT = 7;
// const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

// const labels = months({ count: 7 });
// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: numbers(NUMBER_CFG),
//       borderColor: CHART_COLORS.red,
//       backgroundColor: transparentize(CHART_COLORS.red, 0.5),
//       yAxisID: 'y',
//     },
//     {
//       label: 'Dataset 2',
//       data: numbers(NUMBER_CFG),
//       borderColor: CHART_COLORS.blue,
//       backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
//       yAxisID: 'y1',
//     }
//   ]
// };
// // </block:setup>

// // <block:config:0>
// const config = {
//   type: 'line',
//   data: data,
//   options: {
//     responsive: true,
//     interaction: {
//       mode: 'index',
//       intersect: false,
//     },
//     stacked: false,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Chart.js Line Chart - Multi Axis'
//       }
//     },
//     scales: {
//       y: {
//         type: 'linear',
//         display: true,
//         position: 'left',
//       },
//       y1: {
//         type: 'linear',
//         display: true,
//         position: 'right',

//         // grid line settings
//         grid: {
//           drawOnChartArea: false, // only want the grid lines for one axis to show up
//         },
//       },
//     }
//   },
// };
// // </block:config>


// module.exports = {
//   actions: actions,
//   config: config,
// };

// const myChart = new Chart(
//   ctx,
//   config
// );

// export default myChart;