import "./styles.css";

import './sudoku-app';

const runApp = document.getElementById('startBtn');
runApp.addEventListener('click', () => {

  const size = Number(document.querySelector('input[name="size"]:checked').value);
  const difficulty = Number(document.querySelector('input[name="difficulty"]:checked').value);
  
  const config = {
    size,
    difficulty
  }
  console.log(config);
  
});