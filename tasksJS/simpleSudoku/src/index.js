import "./styles.css";

import { inputData } from "./inputData.js";
import { scannerArr } from "./helpers.js";
import sudokuApp from "./sudoku-app.js";
import userInputGrid from "./userInputGrid.js"

let currentApp = null;
let appIsRunning = false;
let score = {};

document.addEventListener('DOMContentLoaded', function () {

  const runApp = document.getElementById('startBtn');

  const sudokuElem = document.getElementById('app-container');

  const dropdownToggle = document.querySelector('.drop-down__toggle');
  const dropdownMenu = document.querySelector('.drop-down__menu');

  const sizeBtns = document.querySelectorAll('input[name="size"]');
  const difficultyBtns = document.querySelectorAll('input[name="difficulty"]');

  const modal = document.getElementById('modal');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const resetBtn = document.getElementById('resetButton');

  const scoreGridEl = document.getElementById('resultScore');
  const scoreTimeEl = document.getElementById('resultTime');
  const scoreErrEl = document.getElementById('errorCount');

  resetBtn.addEventListener('click', handlerResetBtn);

  window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; }
  playAgainBtn.onclick = () => modal.style.display = 'none';

  const updateDifficultyState = () => {
    const selectedSize = Array.from(sizeBtns).find(btn => btn.checked);
    const isSmallSize = selectedSize && selectedSize.value === '2';
    const sectionDifficulty = document.querySelector('.form__difficulty .options');

    // если выбрана сетка 2x2, заблокировать выбор сложности, выделить легко
    if (isSmallSize) {
      difficultyBtns.forEach(btn => {
        if (btn.value !== '0') {
          btn.disabled = true;
        } else {
          btn.checked = true;
          btn.disabled = true;
        }
      });

      if (sectionDifficulty) sectionDifficulty.classList.add('locked-group');
    } else {
      // разблокировать все кнопки
      difficultyBtns.forEach(btn => { btn.disabled = false; });
      if (sectionDifficulty) sectionDifficulty.classList.remove('locked-group');
    }
  }

  // отследить изменение поля размера сетки, обновить состояние поля сложности
  sizeBtns.forEach(btn => btn.addEventListener('change', updateDifficultyState));

  // Переключение меню
  dropdownToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('menu--hidden');
  });

  // Предотвратиь закрытие при клике внутри меню
  dropdownMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  const updateInputData = () => {
    const size = Number(document.querySelector('input[name="size"]:checked').value);
    const difficulty = Number(document.querySelector('input[name="difficulty"]:checked').value);

    inputData.size = size;
    inputData.difficulty = difficulty;
  }

  // создать задачу
  runApp.addEventListener('click', () => {

    // запретить создание задачи, пока не выполнится предыдущая
    if (appIsRunning) return;

    appIsRunning = true;

    // свернуть меню, после клика Создать
    if (!dropdownMenu.classList.contains('menu--hidden')) dropdownMenu.classList.toggle('menu--hidden');

    // Если есть предыдущее приложение — очищаем его
    if (currentApp) cleanup(currentApp);

    // обновить входные данные
    updateInputData();

    // примитивная статистика
    score.startTime = Date.now();
    score.size = inputData.size;
    score.difficulty = inputData.difficulty;
    score.errorCount = 0;

    currentApp = sudokuApp(inputData, sudokuElem);

    if (currentApp) {

      appIsRunning = false;

      sudokuElem.addEventListener('input', handlerInput);
      resetBtn.style.display = 'block';
    }
  });

  function handlerInput(e) {

    const inputs = document.querySelectorAll('.cell-input');

    if (!inputs) return;

    // диапазон ввода чисел
    const range = inputData.arrData.length;

    // выполняется пока не заполнены все ячейки
    // возвращает true, false, 'reset'
    const isGridComplete = userInputGrid(e, inputs, range);

    onComplete(isGridComplete, inputs);
  }

  function onComplete(value, cells) {

    switch (value) {
      // сетка заполнена верно
      case true:
        resetBtn.style.display = 'none';
        sudokuElem.classList.add('solved'); // подсветить поле
        cells.forEach(cell => { 
          cell.style.color = '#222';
          cell.readOnly = true; // заблокировать ввод
        });

        showSuccessModal();
        break;

      // сетка заполняется, ничего не делать
      case false:
        break;

      // сетка заполнена неверно, предложить сбросить введеные значения
      case 'reset':
        score.errorCount++;
        break;
    }
  }

  function handlerResetBtn() {
    
    let numberIsInput = false;

    const inputs = document.querySelectorAll('.cell-input');
    inputs.forEach(input => {
      if (input.value !== '') numberIsInput = true;
      input.value = '';
    });

    if (numberIsInput) score.errorCount++;
  }

  function showSuccessModal() {

    const endTime = Date.now();

    modal.style.display = 'flex';

    const formatteDdifficulty = (level) => {
      switch (level) {
        case 0:
          return 'easy';
        case 1:
          return 'medium';
        case 2:
          return 'hard';
      }
    }

    const scoreGrid = `${score.size}x${score.size} : ${formatteDdifficulty(score.difficulty)}`;

    scoreGridEl.textContent = scoreGrid;

    const elapsedMs = endTime - score.startTime;

    const seconds = Math.floor((elapsedMs / 1000) % 60);
    const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedMs / (1000 * 60 * 60)) % 24);

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    scoreTimeEl.textContent = formattedTime;
    scoreErrEl.textContent = score.errorCount;
  }

  // Функция очистки состояния
  function cleanup(app) {

    // Сброс счётчиков
    scannerArr.reset();
    score = {};

    // скрыть результаты
    modal.style.display = 'none';
    resetBtn.style.display = 'none';
    scoreGridEl.textContent = '';
    scoreTimeEl.textContent = '';
    scoreErrEl.textContent = '';

    // удалить обработчики и аттрибуты
    sudokuElem.removeEventListener('input', handlerInput);
    if (sudokuElem.classList.contains('solved')) sudokuElem.classList.remove('solved');

    app = null;
  }
});
