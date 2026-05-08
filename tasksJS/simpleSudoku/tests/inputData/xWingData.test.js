const xWingMap = {
  mainTable: {
    0: [
      { value: [1, 7], address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: 4, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: 3, address: { axisX: 'sectionX0.row0', axisY: 'sectionY0.column2', innerTableId: 0 } },
      { value: 6, address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: [7, 8, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: [1, 7, 8, 9], address: { axisX: 'sectionX0.row1', axisY: 'sectionY0.column2', innerTableId: 0 } },
      { value: 2, address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column0', innerTableId: 0 } },
      { value: [5, 7, 8], address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column1', innerTableId: 0 } },
      { value: [5, 7, 8], address: { axisX: 'sectionX0.row2', axisY: 'sectionY0.column2', innerTableId: 0 } }
    ],
    1: [
      { value: 9, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 8, address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: [6, 7], address: { axisX: 'sectionX0.row0', axisY: 'sectionY1.column2', innerTableId: 1 } },
      { value: 4, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: 2, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 5, address: { axisX: 'sectionX0.row1', axisY: 'sectionY1.column2', innerTableId: 1 } },
      { value: [3, 7], address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column0', innerTableId: 1 } },
      { value: [3, 6], address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column1', innerTableId: 1 } },
      { value: 1, address: { axisX: 'sectionX0.row2', axisY: 'sectionY1.column2', innerTableId: 1 } }
    ],
    2: [
      { value: 2, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 5, address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: [1, 6, 7], address: { axisX: 'sectionX0.row0', axisY: 'sectionY2.column2', innerTableId: 2 } },
      { value: [1, 3, 8], address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: [3, 8], address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: [1, 7, 8], address: { axisX: 'sectionX0.row1', axisY: 'sectionY2.column2', innerTableId: 2 } },
      { value: [6, 8], address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column0', innerTableId: 2 } },
      { value: 9, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column1', innerTableId: 2 } },
      { value: 4, address: { axisX: 'sectionX0.row2', axisY: 'sectionY2.column2', innerTableId: 2 } }
    ],
    3: [
      { value: 9, address: { axisX: 'sectionX1.row0', axisY: 'sectionY0.column0', innerTableId: 3 } },
      { value: [5, 6, 8], address: { axisX: 'sectionX1.row0', axisY: 'sectionY0.column1', innerTableId: 3 } },
      { value: [2, 5, 6, 8], address: { axisX: 'sectionX1.row0', axisY: 'sectionY0.column2', innerTableId: 3 } },
      { value: 3, address: { axisX: 'sectionX1.row1', axisY: 'sectionY0.column0', innerTableId: 3 } },
      { value: [5, 7], address: { axisX: 'sectionX1.row1', axisY: 'sectionY0.column1', innerTableId: 3 } },
      { value: [2, 5, 7], address: { axisX: 'sectionX1.row1', axisY: 'sectionY0.column2', innerTableId: 3 } },
      { value: 4, address: { axisX: 'sectionX1.row2', axisY: 'sectionY0.column0', innerTableId: 3 } },
      { value: 1, address: { axisX: 'sectionX1.row2', axisY: 'sectionY0.column1', innerTableId: 3 } },
      { value: [5, 6, 7, 8], address: { axisX: 'sectionX1.row2', axisY: 'sectionY0.column2', innerTableId: 3 } }
    ],
    4: [
      { value: [1, 3], address: { axisX: 'sectionX1.row0', axisY: 'sectionY1.column0', innerTableId: 4 } },
      { value: [1, 3, 5], address: { axisX: 'sectionX1.row0', axisY: 'sectionY1.column1', innerTableId: 4 } },
      { value: 4, address: { axisX: 'sectionX1.row0', axisY: 'sectionY1.column2', innerTableId: 4 } },
      { value: 6, address: { axisX: 'sectionX1.row1', axisY: 'sectionY1.column0', innerTableId: 4 } },
      { value: [1, 5, 7], address: { axisX: 'sectionX1.row1', axisY: 'sectionY1.column1', innerTableId: 4 } },
      { value: 8, address: { axisX: 'sectionX1.row1', axisY: 'sectionY1.column2', innerTableId: 4 } },
      { value: 2, address: { axisX: 'sectionX1.row2', axisY: 'sectionY1.column0', innerTableId: 4 } },
      { value: [5, 7], address: { axisX: 'sectionX1.row2', axisY: 'sectionY1.column1', innerTableId: 4 } },
      { value: 9, address: { axisX: 'sectionX1.row2', axisY: 'sectionY1.column2', innerTableId: 4 } }
    ],
    5: [
      { value: [1, 5, 6, 8], address: { axisX: 'sectionX1.row0', axisY: 'sectionY2.column0', innerTableId: 5 } },
      { value: 7, address: { axisX: 'sectionX1.row0', axisY: 'sectionY2.column1', innerTableId: 5 } },
      { value: [1, 2, 6, 8], address: { axisX: 'sectionX1.row0', axisY: 'sectionY2.column2', innerTableId: 5 } },
      { value: [4, 9], address: { axisX: 'sectionX1.row1', axisY: 'sectionY2.column0', innerTableId: 5 } },
      { value: [2, 4], address: { axisX: 'sectionX1.row1', axisY: 'sectionY2.column1', innerTableId: 5 } },
      { value: [1, 2, 9], address: { axisX: 'sectionX1.row1', axisY: 'sectionY2.column2', innerTableId: 5 } },
      { value: [5, 6, 8], address: { axisX: 'sectionX1.row2', axisY: 'sectionY2.column0', innerTableId: 5 } },
      { value: [6, 8], address: { axisX: 'sectionX1.row2', axisY: 'sectionY2.column1', innerTableId: 5 } },
      { value: 3, address: { axisX: 'sectionX1.row2', axisY: 'sectionY2.column2', innerTableId: 5 } }
    ],
    6: [
      { value: 8, address: { axisX: 'sectionX2.row0', axisY: 'sectionY0.column0', innerTableId: 6 } },
      { value: 2, address: { axisX: 'sectionX2.row0', axisY: 'sectionY0.column1', innerTableId: 6 } },
      { value: [1, 7], address: { axisX: 'sectionX2.row0', axisY: 'sectionY0.column2', innerTableId: 6 } },
      { value: [1, 7], address: { axisX: 'sectionX2.row1', axisY: 'sectionY0.column0', innerTableId: 6 } },
      { value: [6, 9], address: { axisX: 'sectionX2.row1', axisY: 'sectionY0.column1', innerTableId: 6 } },
      { value: [6, 9], address: { axisX: 'sectionX2.row1', axisY: 'sectionY0.column2', innerTableId: 6 } },
      { value: 5, address: { axisX: 'sectionX2.row2', axisY: 'sectionY0.column0', innerTableId: 6 } },
      { value: 3, address: { axisX: 'sectionX2.row2', axisY: 'sectionY0.column1', innerTableId: 6 } },
      { value: 4, address: { axisX: 'sectionX2.row2', axisY: 'sectionY0.column2', innerTableId: 6 } }
    ],
    7: [
      { value: 5, address: { axisX: 'sectionX2.row0', axisY: 'sectionY1.column0', innerTableId: 7 } },
      { value: [1, 6], address: { axisX: 'sectionX2.row0', axisY: 'sectionY1.column1', innerTableId: 7 } },
      { value: [3, 6, 7], address: { axisX: 'sectionX2.row0', axisY: 'sectionY1.column2', innerTableId: 7 } },
      { value: [1, 7], address: { axisX: 'sectionX2.row1', axisY: 'sectionY1.column0', innerTableId: 7 } },
      { value: 4, address: { axisX: 'sectionX2.row1', axisY: 'sectionY1.column1', innerTableId: 7 } },
      { value: [2, 3], address: { axisX: 'sectionX2.row1', axisY: 'sectionY1.column2', innerTableId: 7 } },
      { value: 8, address: { axisX: 'sectionX2.row2', axisY: 'sectionY1.column0', innerTableId: 7 } },
      { value: 9, address: { axisX: 'sectionX2.row2', axisY: 'sectionY1.column1', innerTableId: 7 } },
      { value: [2, 6], address: { axisX: 'sectionX2.row2', axisY: 'sectionY1.column2', innerTableId: 7 } }
    ],
    8: [
      { value: [4, 9], address: { axisX: 'sectionX2.row0', axisY: 'sectionY2.column0', innerTableId: 8 } },
      { value: [3, 4, 6], address: { axisX: 'sectionX2.row0', axisY: 'sectionY2.column1', innerTableId: 8 } },
      { value: [6, 9], address: { axisX: 'sectionX2.row0', axisY: 'sectionY2.column2', innerTableId: 8 } },
      { value: [3, 8], address: { axisX: 'sectionX2.row1', axisY: 'sectionY2.column0', innerTableId: 8 } },
      { value: [2, 3, 8], address: { axisX: 'sectionX2.row1', axisY: 'sectionY2.column1', innerTableId: 8 } },
      { value: 5, address: { axisX: 'sectionX2.row1', axisY: 'sectionY2.column2', innerTableId: 8 } },
      { value: 7, address: { axisX: 'sectionX2.row2', axisY: 'sectionY2.column0', innerTableId: 8 } },
      { value: 1, address: { axisX: 'sectionX2.row2', axisY: 'sectionY2.column1', innerTableId: 8 } },
      { value: [2, 6], address: { axisX: 'sectionX2.row2', axisY: 'sectionY2.column2', innerTableId: 8 } }
    ]
  },
  get objToCheck() {
    return {
      arr: this.mainTable[1],
      cell: this.mainTable[1][2]
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
      this.mainTable[1][2],
      this.mainTable[1][5],
      this.mainTable[1][8],
      this.mainTable[4][2],
      this.mainTable[4][5],
      this.mainTable[4][8],
      this.mainTable[7][2],
      this.mainTable[7][5],
      this.mainTable[7][8]
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
          this.mainTable[4][0],
          this.mainTable[4][1],
          this.mainTable[4][2],
          this.mainTable[5][0],
          this.mainTable[5][1],
          this.mainTable[5][2]
        ],
        row1: [
          this.mainTable[3][3],
          this.mainTable[3][4],
          this.mainTable[3][5],
          this.mainTable[4][3],
          this.mainTable[4][4],
          this.mainTable[4][5],
          this.mainTable[5][3],
          this.mainTable[5][4],
          this.mainTable[5][5]
        ],
        row2: [
          this.mainTable[3][6],
          this.mainTable[3][7],
          this.mainTable[3][8],
          this.mainTable[4][6],
          this.mainTable[4][7],
          this.mainTable[4][8],
          this.mainTable[5][6],
          this.mainTable[5][7],
          this.mainTable[5][8]
        ]
      },
      sectionX2: {
        row0: [
          this.mainTable[6][0],
          this.mainTable[6][1],
          this.mainTable[6][2],
          this.mainTable[7][0],
          this.mainTable[7][1],
          this.mainTable[7][2],
          this.mainTable[8][0],
          this.mainTable[8][1],
          this.mainTable[8][2]
        ],
        row1: [
          this.mainTable[6][3],
          this.mainTable[6][4],
          this.mainTable[6][5],
          this.mainTable[7][3],
          this.mainTable[7][4],
          this.mainTable[7][5],
          this.mainTable[8][3],
          this.mainTable[8][4],
          this.mainTable[8][5]
        ],
        row2: [
          this.mainTable[6][6],
          this.mainTable[6][7],
          this.mainTable[6][8],
          this.mainTable[7][6],
          this.mainTable[7][7],
          this.mainTable[7][8],
          this.mainTable[8][6],
          this.mainTable[8][7],
          this.mainTable[8][8]
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
          this.mainTable[1][6],
          this.mainTable[4][0],
          this.mainTable[4][3],
          this.mainTable[4][6],
          this.mainTable[7][0],
          this.mainTable[7][3],
          this.mainTable[7][6]
        ],
        column1: [
          this.mainTable[1][1],
          this.mainTable[1][4],
          this.mainTable[1][7],
          this.mainTable[4][1],
          this.mainTable[4][4],
          this.mainTable[4][7],
          this.mainTable[7][1],
          this.mainTable[7][4],
          this.mainTable[7][7]
        ],
        column2: [
          this.mainTable[1][2],
          this.mainTable[1][5],
          this.mainTable[1][8],
          this.mainTable[4][2],
          this.mainTable[4][5],
          this.mainTable[4][8],
          this.mainTable[7][2],
          this.mainTable[7][5],
          this.mainTable[7][8]
        ]
      },
      sectionY2: {
        column0: [
          this.mainTable[2][0],
          this.mainTable[2][3],
          this.mainTable[2][4],
          this.mainTable[5][0],
          this.mainTable[5][3],
          this.mainTable[5][4],
          this.mainTable[8][0],
          this.mainTable[8][3],
          this.mainTable[8][4]
        ],
        column1: [
          this.mainTable[2][1],
          this.mainTable[2][4],
          this.mainTable[2][7],
          this.mainTable[5][1],
          this.mainTable[5][4],
          this.mainTable[5][7],
          this.mainTable[8][1],
          this.mainTable[8][4],
          this.mainTable[8][7]
        ],
        column2: [
          this.mainTable[2][2],
          this.mainTable[2][5],
          this.mainTable[2][8],
          this.mainTable[5][2],
          this.mainTable[5][5],
          this.mainTable[5][8],
          this.mainTable[8][2],
          this.mainTable[8][5],
          this.mainTable[8][8]
        ]
      }
    }
  }
};

export { xWingMap }