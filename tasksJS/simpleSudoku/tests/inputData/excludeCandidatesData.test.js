// Исключение кандидатов
const excludeCandidatesMap = {
  mainTable: {
    0: [
      { value: 7, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: 3, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: [6, 9], address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column2', innerTableId: 0 } },
      { value: 2, address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: [1, 5, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: 4, address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column2', innerTableId: 0 } },
      { value: 8, address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: [1, 5, 6, 9], address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: [1, 6, 9], address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column2', innerTableId: 0 } }
    ],
    1: [
      { value: 8, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 4, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 1, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column2', innerTableId: 1 } },
      { value: [5, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 6, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 3, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column2', innerTableId: 1 } },
      { value: [5, 9], address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 2, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 7, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column2', innerTableId: 1 } }
    ],
    2: [
      { value: [5, 6, 9], address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: [5, 6, 9], address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: 2, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column2', innerTableId: 2 } },
      { value: 8, address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: [1, 5, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: 7, address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column2', innerTableId: 2 } },
      { value: 4, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 3, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: [1, 5], address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column2', innerTableId: 2 } }
    ]
  },
  get objToCheck() {
    return {
      arr: this.mainTable[0],
      cell: this.mainTable[0][2]
    }
  },
  get arrX() {
    return [
      this.mainTable[0][0],
      this.mainTable[0][1],
      this.mainTable[0][2],
      this.mainTable[1][0],
      this.mainTable[1][1],
      this.mainTable[1][2],
      this.mainTable[2][0],
      this.mainTable[2][1],
      this.mainTable[2][2]
    ]
  },
  get arrY() {
    return [
      this.mainTable[0][2],
      this.mainTable[0][5],
      this.mainTable[0][8]
    ]
  }
};

export { excludeCandidatesMap }