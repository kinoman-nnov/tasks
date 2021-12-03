import './css/style.css';
import urls from './moduleUrls';
const axios = require('axios');

const loadButton = document.querySelector('#loadButton');
const result = document.querySelector('.gallery');

function axiosExample(url){
  axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    const head = document.createElement('h1');
      result.appendChild(head);
      head.textContent = "GET запрос axios выполнен";
    // always executed
  });
}

function loadFileXML(url) {
  const heading = document.createElement('h1');
  result.appendChild(heading);
  const promise = new Promise(function (resolve) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {

      resolve([xhr.responseText, heading]); // передаю дополнительный параметр heading, с помощью массива
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

    img.addEventListener('load', function () {
      resolve();
    });
  });

  return promise;
}

loadButton.addEventListener('click', function () {
  loadFileXML(urls[0]) // загрузка файла c XMLHttpRequest()
    .then(function (value) {
      value[1].textContent = value[0] + '--->';

      return loadFileFetch(urls[1]); // загрузка файла c fetch()
    })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      const heading = document.createElement('h1');
      result.appendChild(heading);
      heading.textContent = text;

      return loadImage(urls[2]); // загрузка картинок
    })
    .then(function () {
      console.log('pic 1 load')
      return loadImage(urls[3]);
    })
    .then(function () {
      console.log('pic 2 load')
      return loadImage(urls[4]);
    })
    .then(function () {
      console.log('pic 3 load')
      return loadImage(urls[5]);
    })
    .then(function () {
      console.log('pic 4 load');
      return axiosExample(urls[6]);
    });
});

