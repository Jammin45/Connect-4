let posOver = 0
let color = 'yellow'
board = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
]
boardHeight = [6, 6, 6, 6, 6, 6, 6]
class tile {
    constructor(row,column) {
        const add = document.createElement('div');
        add.classList = 'tile';
        add.id = `${row}/${column}`;
        add.style.gridRow = row;
        add.style.gridColumn = column;
        document.getElementsByClassName('board')[0].appendChild(add);
        const tile = document.getElementById(`${row}/${column}`);
        tile.addEventListener('mouseover', () => {
            posOver = column;
        })
        tile.addEventListener('mouseleave', () => {
            posOver = 0;
        })
        document.getElementById('tile').addEventListener('click', () => {
            if (posOver === column && boardHeight[column-1] === row) {
                if (boardHeight[column-1] != 0) {
                    add.classList = `tile ${color}`;
                    const currentColor = color;
                    if (color === 'yellow') {
                        color = 'red';
                        board[row-1][column-1] = 1;
                    } else {
                        color = 'yellow';
                        board[row-1][column-1] = 2;
                    }
                    boardHeight[column-1] -= 1;
                    setTimeout(() => {
                        const win = winner();
                        if (win === 1) {
                            window.alert("Yellow won");
                        } else if (win === 2) {
                            window.alert("Red won");
                        }
                    }, 0);
                }
            }
        });
    }
}
function winner() {
  const rows = board.length;
  const cols = board[0].length;
  const directions = [
    [0, 1],   // Horizontal
    [1, 0],   // Vertical
    [1, 1],   // Diagonal down-right
    [1, -1]   // Diagonal down-left
  ];
  function isWinningSequence(r, c, dr, dc, player) {
    for (let i = 0; i < 4; i++) {
      const nr = r + dr * i;
      const nc = c + dc * i;
      if (
        nr < 0 || nr >= rows ||
        nc < 0 || nc >= cols ||
        board[nr][nc] !== player
      ) {
        return false;
      }
    }
    return true;
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const player = board[r][c];
      if (player === 0) continue;
      for (const [dr, dc] of directions) {
        if (isWinningSequence(r, c, dr, dc, player)) {
          return player;
        }
      }
    }
  }
  return 0;
}
for (i=1;i<7;i++) {
    for (j=1;j<8;j++) {
        new tile(i, j);
    }
}