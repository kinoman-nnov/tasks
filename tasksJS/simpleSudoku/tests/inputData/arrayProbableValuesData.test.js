const arrayProbableValues = {
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
      { value: null, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column0', innerTableId: 2 } },
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
      arr: this.mainTable[2],
      cell: this.mainTable[2][0]
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
      this.mainTable[2][0],
      this.mainTable[2][3],
      this.mainTable[2][6]
    ]
  }
};

const mapNumbersComplite = {
  mainTable: {
    0: [
      { value: 8, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: 4, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: 3, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column2', innerTableId: 0 } },
      { value: 1, address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: 5, address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: 9, address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column2', innerTableId: 0 } },
      { value: 7, address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: 6, address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: 2, address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column2', innerTableId: 0 } }
    ],
    1: [
      { value: 5, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 7, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 2, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column2', innerTableId: 1 } },
      { value: 3, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 6, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 4, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column2', innerTableId: 1 } },
      { value: 9, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 1, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 8, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column2', innerTableId: 1 } }
    ],
    2: [
      { value: 6, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 9, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: 1, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column2', innerTableId: 2 } },
      { value: 2, address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 7, address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: 8, address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column2', innerTableId: 2 } },
      { value: 5, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 3, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: 4, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column2', innerTableId: 2 } }
    ]
  },
  get objToCheck() {
    return {
      arr: this.mainTable[2],
      cell: this.mainTable[2][0]
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
      this.mainTable[2][0],
      this.mainTable[2][3],
      this.mainTable[2][6]
    ]
  }
};

const seriesNakedFourLoopMap = {
  mainTable: {
    0: [
      { value: null, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: [2, 4], address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: [2, 4, 7], address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column2', innerTableId: 0 } },
      { value: [1, 5, 6, 8], address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: [1, 6, 8], address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: [3, 7], address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column2', innerTableId: 0 } },
      { value: [1, 6], address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: 9, address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: [3, 4], address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column2', innerTableId: 0 } }
    ],
    1: [
      { value: [4, 5], address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 3, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: [1, 9], address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column2', innerTableId: 1 } },
      { value: [5, 6], address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 2, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: [1, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column2', innerTableId: 1 } },
      { value: [4, 6], address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 7, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 8, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column2', innerTableId: 1 } }
    ],
    2: [
      { value: [7, 9], address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 8, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: 6, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column2', innerTableId: 2 } },
      { value: [7, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 4, address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: [1, 3], address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column2', innerTableId: 2 } },
      { value: 5, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 2, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: [1, 3], address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column2', innerTableId: 2 } }
    ],
    3: [
      { value: 3, address: { axisX: 'sectionX1.row0', axisY: 'sectionY0.column0', innerTableId: 3 } },
      { value: 7, address: { axisX: 'sectionX1.row0', axisY: 'sectionY0.column1', innerTableId: 3 } },
      { value: 1, address: { axisX: 'sectionX1.row0', axisY: 'sectionY0.column2', innerTableId: 3 } },
      { value: 9, address: { axisX: 'sectionX1.row1', axisY: 'sectionY0.column0', innerTableId: 3 } },
      { value: [8, 6], address: { axisX: 'sectionX1.row1', axisY: 'sectionY0.column1', innerTableId: 3 } },
      { value: [8, 6], address: { axisX: 'sectionX1.row1', axisY: 'sectionY0.column2', innerTableId: 3 } },
      { value: 4, address: { axisX: 'sectionX1.row2', axisY: 'sectionY0.column0', innerTableId: 3 } },
      { value: [2, 5], address: { axisX: 'sectionX1.row2', axisY: 'sectionY0.column1', innerTableId: 3 } },
      { value: [2, 5], address: { axisX: 'sectionX1.row2', axisY: 'sectionY0.column2', innerTableId: 3 } }
    ],
    6: [
      { value: 2, address: { axisX: 'sectionX2.row0', axisY: 'sectionY0.column0', innerTableId: 6 } },
      { value: [1, 4, 6], address: { axisX: 'sectionX2.row0', axisY: 'sectionY0.column1', innerTableId: 6 } },
      { value: [4, 6], address: { axisX: 'sectionX2.row0', axisY: 'sectionY0.column2', innerTableId: 6 } },
      { value: [1, 8], address: { axisX: 'sectionX2.row1', axisY: 'sectionY0.column0', innerTableId: 6 } },
      { value: 3, address: { axisX: 'sectionX2.row1', axisY: 'sectionY0.column1', innerTableId: 6 } },
      { value: 9, address: { axisX: 'sectionX2.row1', axisY: 'sectionY0.column2', innerTableId: 6 } },
      { value: 7, address: { axisX: 'sectionX2.row2', axisY: 'sectionY0.column0', innerTableId: 6 } },
      { value: [5, 6, 8], address: { axisX: 'sectionX2.row2', axisY: 'sectionY0.column1', innerTableId: 6 } },
      { value: [5, 6, 8], address: { axisX: 'sectionX2.row2', axisY: 'sectionY0.column2', innerTableId: 6 } }
    ]
  },
  get objToCheck() {
    return {
      arr: this.mainTable[0],
      cell: this.mainTable[0][0]
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
      this.mainTable[0][0],
      this.mainTable[0][3],
      this.mainTable[0][6],
      this.mainTable[3][0],
      this.mainTable[3][3],
      this.mainTable[3][6],
      this.mainTable[6][0],
      this.mainTable[6][3],
      this.mainTable[6][6]
    ]
  },
  get x() {
    return {
      sectionX0: {
        row0: [
          this.mainTable[0][0],
          this.mainTable[0][1],
          this.mainTable[0][2],
          this.mainTable[1][0],
          this.mainTable[1][1],
          this.mainTable[1][2],
          this.mainTable[2][0],
          this.mainTable[2][1],
          this.mainTable[2][2]
        ],
        row1: [
          this.mainTable[0][3],
          this.mainTable[0][4],
          this.mainTable[0][5],
          this.mainTable[1][3],
          this.mainTable[1][4],
          this.mainTable[1][5],
          this.mainTable[2][3],
          this.mainTable[2][4],
          this.mainTable[2][5]
        ],
        row2: [
          this.mainTable[0][6],
          this.mainTable[0][7],
          this.mainTable[0][8],
          this.mainTable[1][6],
          this.mainTable[1][7],
          this.mainTable[1][8],
          this.mainTable[2][6],
          this.mainTable[2][7],
          this.mainTable[2][8]
        ]
      },
      sectionX1: {
        row0: [
          this.mainTable[3][0],
          this.mainTable[3][1],
          this.mainTable[3][2],
        ],
        row1: [
          this.mainTable[3][3],
          this.mainTable[3][4],
          this.mainTable[3][5],
        ],
        row2: [
          this.mainTable[3][6],
          this.mainTable[3][7],
          this.mainTable[3][8],
        ]
      },
      sectionX2: {
        row0: [
          this.mainTable[6][0],
          this.mainTable[6][1],
          this.mainTable[6][2]
        ],
        row1: [
          this.mainTable[6][3],
          this.mainTable[6][4],
          this.mainTable[6][5]
        ],
        row2: [
          this.mainTable[6][6],
          this.mainTable[6][7],
          this.mainTable[6][8]
        ]
      }
    }
  },
  get y() {
    return {
      sectionY0: {
        column0: [
          this.mainTable[0][0],
          this.mainTable[0][3],
          this.mainTable[0][6],
          this.mainTable[3][0],
          this.mainTable[3][3],
          this.mainTable[3][6],
          this.mainTable[6][0],
          this.mainTable[6][3],
          this.mainTable[6][6]
        ],
        column1: [
          this.mainTable[0][1],
          this.mainTable[0][4],
          this.mainTable[0][7],
          this.mainTable[3][1],
          this.mainTable[3][4],
          this.mainTable[3][7],
          this.mainTable[6][1],
          this.mainTable[6][4],
          this.mainTable[6][7]
        ],
        column2: [
          this.mainTable[0][2],
          this.mainTable[0][5],
          this.mainTable[0][8],
          this.mainTable[3][2],
          this.mainTable[3][5],
          this.mainTable[3][8],
          this.mainTable[6][2],
          this.mainTable[6][5],
          this.mainTable[6][8]
        ]
      },
      sectionY1: {
        column0: [
          this.mainTable[1][0],
          this.mainTable[1][3],
          this.mainTable[1][6]
        ],
        column1: [
          this.mainTable[1][1],
          this.mainTable[1][4],
          this.mainTable[1][7]
        ],
        column2: [
          this.mainTable[1][2],
          this.mainTable[1][5],
          this.mainTable[1][8]
        ]
      },
      sectionY2: {
        column0: [
          this.mainTable[2][0],
          this.mainTable[2][3],
          this.mainTable[2][6]
        ],
        column1: [
          this.mainTable[2][1],
          this.mainTable[2][4],
          this.mainTable[2][7]
        ],
        column2: [
          this.mainTable[2][2],
          this.mainTable[2][5],
          this.mainTable[2][8]
        ]
      }
    }
  }
};

export { arrayProbableValues, mapNumbersComplite, seriesNakedFourLoopMap }