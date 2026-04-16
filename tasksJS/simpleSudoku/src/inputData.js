const inputData = {
  // "arrData": [1, 2, 3, 4, 5, 6, 7, 8, 9],
  // "size": 3,
  // "difficulty": 2,
  _size: 3,
  _difficulty: 2,

  get size() {
    return this._size;
  },
  get difficulty() {
    return this._difficulty;
  },

  set size(value) {
    this._size = value;
  },
  set difficulty(value) {
    this._difficulty = value;
  },

  get arrData() {
    const n = this.size ** 2;
    // Генерирования последовательности чисел 
    // для size == 3 arrData = [1, 2, 3, ..., 9]
    return Array.from({ length: n }, (v, k) => k + 1);
  },
  get arrCells() {
    const result = [];
    const matrixSize = this.arrData.length;
    // Генерирования последовательности адресов таблицы (исключены числа ..9)
    // для size == 3 arrCells = [0, 1, 2, ..., 7, 8, 10, 11, ..., 17,18, ..., 88]
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        const str = String(i) + String(j);
        result.push(str);
      }
    }
    return result;
  }
}

export { inputData };