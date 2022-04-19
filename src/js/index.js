const BLOCK_SIZE = 25;

// Логика игры
const game = {
  area: [
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['x', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'x', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'x'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'x', 'o', 'o', 'o', 'o', 'x', 'o', 'o', 'x'],
    ['x', 'x', 'o', 'x', 'x', 'o', 'x', 'x', 'o', 'x'],
    ['x', 'o', 'o', 'x', 'x', 'o', 'x', 'o', 'x', 'x'],
  ],

  activeTetramino: {
    x: 3,
    y: 0,
    block: [
      ['o', 'x', 'o'],
      ['o', 'x', 'o'],
      ['x', 'x', 'o'],
    ]
  },

  moveLeft() {
    this.activeTetramino.x -= 1;
  },

  moveRight() {
    this.activeTetramino.x += 1;
  },

  moveDown() {
    this.activeTetramino.y += 1;
  },

  rotateTetramino() { },

  get viewArea() {
    const area = JSON.parse(JSON.stringify(this.area));
    const { x, y, block: tetramino } = this.activeTetramino;

    for (let i = 0; i < tetramino.length; i++) {
      const row = tetramino[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === 'x') {
          area[y + i][x + j] = tetramino[i][j];
        }
      }
    }
    return area;
  },
};

// Отрисовка
const container = document.querySelector('.container');

const canvas = document.createElement('canvas');
canvas.classList.add('game-area');
container.append(canvas);
canvas.width = BLOCK_SIZE * 10;
canvas.height = canvas.width * 2;

const context = canvas.getContext('2d');

const showArea = (area) => {
  for (let y = 0; y < area.length; y++) {
    const line = area[y];

    for (let x = 0; x < line.length; x++) {
      const block = line[x];
      if (block === 'x') {
        context.fillStyle = '#3f484d';
        context.strokeStyle = 'white';
        context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
};

showArea(game.viewArea);
