function validateCell(e) {

  let inputValue = e.target.value;

  inputValue = inputValue.replace(/[^1-9]/g, ""); // отфильтровать все символы, кроме цифр
  
  inputValue = inputValue.slice(0, 1);
  
  e.target.value = inputValue;
}

export default function userInputGrig(board) {

  board.addEventListener('input', (e) => {

    if (e.target.classList.contains('cell-input')) validateCell(e);
  });
}

