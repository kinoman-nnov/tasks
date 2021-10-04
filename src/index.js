import './css/style.css'
import urls from './moduleUrls';

const loadButton = document.querySelector('#loadButton');
const result = document.querySelector('.result');

function loadFileXML(url) {  
  const promise = new Promise(function (resolve) {
    const heading = document.createElement('h1');
    result.appendChild(heading);
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      resolve([xhr.responseText, heading]); // передача дополнительного параметра heading с помощью массива в resolve()
    });
  });

  return promise;
}

function loadFileFetch(url) {
  const promise = fetch(url);

  return promise;
}

function loadImage(url) {
  const promise = new Promise(function (resolve) {

    const img = document.createElement('img');
    result.appendChild(img);
    img.src = url;

    img.addEventListener('load', function(){
      resolve();
    });
  });

  return promise;
}

loadButton.addEventListener('click', function () {

  loadFileXML(urls[0]) // Загрузка файла с помощью асинхронного запроса XMLHttpRequest()
    .then(function (value) {
      value[1].textContent = value[0];
      
      return loadFileFetch(urls[1]); // Загрузка файла с помощью асинхронного запроса fetch()
    })
    .then(function (response) {

      return response.text();
    })
    .then(function (text) {
      const heading = document.createElement('h1');
      result.appendChild(heading);
      heading.textContent = text;

      return loadImage(urls[2]); // Загрузка картинок
    })
    .then(function () {
      console.log(`pic 1 load!`);
      return loadImage(urls[3]);
    })
    .then(function () {
      console.log(`pic 2 load!`);
      return loadImage(urls[4]);
    })
    .then(function () {
      console.log(`pic 3 load!`);
    });

});