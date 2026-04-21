// запретить ввод символов, кроме цифр в диапазоне заданной сетки
function validateCell(e, range) {

  let inputValue;
  // реализация для сетки 2х2 и 3х3 (перезаписывает ввод, 1 символ)
  if (range < 10) {

    inputValue = e.data;

    const regex = new RegExp(`[^1-${range}]`, 'g'); // кроме [1-range]

    inputValue = inputValue.replace(regex, ""); // заменить пустой строкой все символы, кроме цифр

    inputValue = inputValue.slice(0, 1);

    e.target.value = inputValue;
  }
  // реализация для сетки 4х4 (не перезаписывает ввод, 2 символа)
  else {
    inputValue = e.target.value;

    inputValue = inputValue.slice(0, 2);

    const num = parseInt(inputValue, 10);

    // если число больше range обрезать/очистить
    if (!isNaN(num)) {
      if (num > range) {
        // если первая цифра допустима - оставить ее
        if (parseInt(inputValue[0], 10) <= range) inputValue = inputValue[0];
        else inputValue = "";
      }
    }

    e.target.value = inputValue;
  }
}

function areAllFieldsFilled(inputs) {
  return Array.from(inputs).every(input => input.value.trim() !== '');
}

function checkEnteredValues(inputs) {
  return Array.from(inputs).every(input => input.value === input.dataset.originValue);
}

export default function userInputGrig(e, items, range) {

  if (e.target.classList.contains('cell-input')) {

    let isComplete = false;

    // проверить ввод, записать в ячейку
    validateCell(e, range);

    // проверить, заполнены ли все поля
    const isFilled = areAllFieldsFilled(items);

    if (isFilled) {
      // проверить правильность заполненных полей
      if (checkEnteredValues(items)) {
        
        isComplete = true;
      }
      // таблица заполнена неверно
      else return 'reset';
    }

    return isComplete;
  }
}