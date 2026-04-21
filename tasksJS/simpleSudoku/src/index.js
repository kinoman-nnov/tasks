import "./styles.css";

import { inputData } from "./inputData.js";
import { scannerArr } from "./helpers.js";
import sudokuApp from "./sudoku-app.js";
import userInputGrid from "./userInputGrid.js"

let currentApp = null;
let appIsRunning = false;

document.addEventListener('DOMContentLoaded', function () {

  const runApp = document.getElementById('startBtn');

  const sudokuElem = document.getElementById('app-container');

  const dropdownToggle = document.querySelector('.drop-down__toggle');
  const dropdownMenu = document.querySelector('.drop-down__menu');

  const sizeBtns = document.querySelectorAll('input[name="size"]');
  const difficultyBtns = document.querySelectorAll('input[name="difficulty"]');

  const msgOk = document.getElementById('successMessage');
  const resetBtn = document.getElementById('resetButton');

  resetBtn.addEventListener('click', handlerResetBtn);

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

    // свернуть меню, после клика Создать
    if (!dropdownMenu.classList.contains('menu--hidden')) dropdownMenu.classList.toggle('menu--hidden');

    appIsRunning = true;

    // Если есть предыдущее приложение — очищаем его
    if (currentApp) cleanup(currentApp);

    // обновить входные данные
    updateInputData();

    currentApp = sudokuApp(inputData, sudokuElem);

    if (currentApp) {
      appIsRunning = false;

      sudokuElem.addEventListener('input', handlerInput);
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

  function handlerResetBtn() {
    const inputs = document.querySelectorAll('.cell-input');
    inputs.forEach(input => input.value = '');
    resetBtn.style.display = 'none';
  }

  function onComplete(value, cells) {
    switch (value) {
      // сетка заполнена верно
      case true:
        msgOk.style.display = 'block';
        sudokuElem.classList.add('solved'); // подсветить поле
        cells.forEach(cell => { cell.readOnly = true; }); // заблокировать ввод
        break;

      // сетка заполняется, ничего не делать
      case false:
        break;

      // сетка заполнена неверно, предложить сбросить введеные значения
      case 'reset':
        resetBtn.style.display = 'block';
        break;
    }
  }

  // Функция очистки состояния
  function cleanup(app) {
    // скрыть результаты
    msgOk.style.display = 'none';
    resetBtn.style.display = 'none';

    // удалить обработчики и аттрибуты
    sudokuElem.removeEventListener('input', handlerInput);
    if (sudokuElem.classList.contains('solved')) sudokuElem.classList.remove('solved');

    // Сброс счётчиков
    scannerArr.reset();

    app = null;
  }
});
