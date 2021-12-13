// import colorLib from '@kurkle/color';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';
import { getLabels, getDataArr } from "./utils";

let createChart = (obj) => {

  const ctx = document.querySelector('.myChart');

  let maxCount; // задает max значения по оси Х [-x, +x]
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

  // const data = {
  //   labels: coordsX,
  //   datasets: [{
  //     label: 'Input',
  //     data: dataInput,
  //     backgroundColor: [
  //       'rgba(24, 30, 214, 0.2)',
  //     ],
  //     borderColor: [
  //       'rgba(24, 30, 214, 1)',
  //     ],
  //     borderWidth: 2,
  //     stack: 'combined',
  //   },
  //   {
  //     label: 'Inter',
  //     data: dataInter,
  //     backgroundColor: [
  //       'rgba(255, 255, 255, 0.2)',
  //     ],
  //     borderColor: [
  //       'rgba(0, 0, 0, 0.5)',
  //     ],
  //     borderWidth: 2,
  //     stack: 'combined',
  //   },
  //   {
  //     label: 'CombIII',
  //     data: dataCombIII,
  //     backgroundColor: [
  //       'rgba(217, 47, 47, 0.2)',
  //     ],
  //     borderColor: [
  //       'rgba(217, 47, 47, 1)',
  //     ],
  //     borderWidth: 2,
  //     stack: 'combined',
  //   },
  //   {
  //     label: 'CombIII2',
  //     data: dataCombIII,
  //     backgroundColor: [
  //       'rgba(217, 47, 47, 0.2)',
  //     ],
  //     borderColor: [
  //       'rgba(217, 47, 47, 1)',
  //     ],
  //     borderWidth: 2,
  //     stack: 'combined',
  //   }]
  // }

  // const config = {
  //   type: 'line',
  //   data: data,
  //   options: {
  //     responsive: true,
  //     scales: {
  //       x: {
  //         type: 'linear',
  //         display: true,
  //         // position: 'center',
  //       },
  //       y: {
  //         type: 'linear',
  //         display: true,
  //         position: 'center',
  //       }
  //     },
  //     plugins: {
  //       title: {
  //         display: true,
  //         text: 'Графики'
  //       },
  //       decimation: decimation,
  //     },
  //   }
  // };

  let _seed = Date.now();

  function valueOrDefault(value, defaultValue) {
    return value ? value : defaultValue;
  }

  function rand(min, max) {
    min = valueOrDefault(min, 0);
    max = valueOrDefault(max, 0);
    _seed = (_seed * 9301 + 49297) % 233280;
    return min + (_seed / 233280) * (max - min);
  }

  function parseISODate(str) {
    return DateTime.fromISO(str);
  }

  const NUM_POINTS = 100000;
  // parseISODate returns a luxon date object to work with in the samples
  // We will create points every 30s starting from this point in time
  const start = parseISODate('2021-04-01T00:00:00Z').toMillis();
  const pointData = [];
  console.log(parseISODate('2021-04-01T00:00:00Z'));
  for (let i = 0; i < NUM_POINTS; ++i) {
    // Most data will be in the range [0, 20) but some rare data will be in the range [0, 100)
    const max = Math.random() < 0.001 ? 100 : 20;
    pointData.push({ x: start + (i * 30000), y: rand(0, max) });
  }
console.log(pointData);
  const data = {
    datasets: [{
      borderColor: ['rgba(217, 47, 47, 1)'],
      borderWidth: 1,
      data: pointData,
      label: 'Large Dataset',
      radius: 0,
    }]
  };
  
  const decimation = {
    enabled: true,
    algorithm: 'min-max',
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      // Turn off animations and data parsing for performance
      animation: false,
      parsing: false,

      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      plugins: {
        decimation: decimation,
      },
      scales: {
        x: {
          type: 'time',
          ticks: {
            source: 'auto',
            // Disabled rotation for performance
            maxRotation: 0,
            autoSkip: true,
          }
        }
      }
    }
  };

  new Chart(
    ctx,
    config
  );
}

//   let _seed = Date.now();

//   function valueOrDefault(value, defaultValue) {
//     return value ? value : defaultValue;
//   }

//   function rand(min, max) {
//     min = valueOrDefault(min, 0);
//     max = valueOrDefault(max, 0);
//     _seed = (_seed * 9301 + 49297) % 233280;
//     return min + (_seed / 233280) * (max - min);
//   }

//   function parseISODate(str) {
//     return DateTime.fromISO(str);
//   }

//   const NUM_POINTS = 100000;
//   // parseISODate returns a luxon date object to work with in the samples
//   // We will create points every 30s starting from this point in time
//   const start = parseISODate('2021-04-01T00:00:00Z').toMillis();
//   const pointData = [];
  
//   for (let i = 0; i < NUM_POINTS; ++i) {
//     // Most data will be in the range [0, 20) but some rare data will be in the range [0, 100)
//     const max = Math.random() < 0.001 ? 100 : 20;
//     pointData.push({ x: start + (i * 30000), y: rand(0, max) });
//   }

//   const data = {
//     datasets: [{
//       borderColor: ['rgba(217, 47, 47, 1)'],
//       borderWidth: 1,
//       data: pointData,
//       label: 'Large Dataset',
//       radius: 0,
//     }]
//   };
  
//   const decimation = {
//     enabled: true,
//     algorithm: 'min-max',
//   };

//   const config = {
//     type: 'line',
//     data: data,
//     options: {
//       // Turn off animations and data parsing for performance
//       animation: false,
//       parsing: false,

//       interaction: {
//         mode: 'nearest',
//         axis: 'x',
//         intersect: false
//       },
//       plugins: {
//         decimation: decimation,
//       },
//       scales: {
//         x: {
//           type: 'time',
//           ticks: {
//             source: 'auto',
//             // Disabled rotation for performance
//             maxRotation: 0,
//             autoSkip: true,
//           }
//         }
//       }
//     }
//   };

//   new Chart(
//     ctx,
//     config
//   );
// }

export default createChart;