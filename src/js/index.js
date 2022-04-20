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
    ],
    rotationIndex: 0,
    rotation: [
      [
        ['o', 'x', 'o'],
        ['o', 'x', 'o'],
        ['x', 'x', 'o'],
      ],
      [
        ['x', 'o', 'o'],
        ['x', 'x', 'x'],
        ['o', 'o', 'o'],
      ],
      [
        ['o', 'x', 'x'],
        ['o', 'x', 'o'],
        ['o', 'x', 'o'],
      ],
      [
        ['o', 'o', 'o'],
        ['x', 'x', 'x'],
        ['o', 'o', 'x'],
      ],
    ],
  },

  moveLeft() {
    if (this.checkOutPosition(this.activeTetramino.x - 1, this.activeTetramino.y)) {
      this.activeTetramino.x -= 1;
    }
  },

  moveRight() {
    if (this.checkOutPosition(this.activeTetramino.x + 1, this.activeTetramino.y)) {
      this.activeTetramino.x += 1;
    }
  },

  moveDown() {
    if (this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y + 1)) {
      this.activeTetramino.y += 1;
    } else {
      this.stopMove();
    }
  },

  rotateTetramino() {
    this.activeTetramino.rotationIndex = this.activeTetramino.rotationIndex < 3 ? this.activeTetramino.rotationIndex + 1 : 0;

    this.activeTetramino.block = this.activeTetramino.rotation[this.activeTetramino.rotationIndex];

    if (!this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y)) {
      this.activeTetramino.rotationIndex = this.activeTetramino.rotationIndex > 0 ? this.activeTetramino.rotationIndex - 1 : 3;

      this.activeTetramino.block = this.activeTetramino.rotation[this.activeTetramino.rotationIndex];
    };
  },

  get viewArea() {
    const area = JSON.parse(JSON.stringify(this.area));
    const { x, y, block: tetramino } = this.activeTetramino;

    for (let i = 0; i < tetramino.length; i++) {
      const row = tetramino[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] !== 'o') {
          area[y + i][x + j] = tetramino[i][j];
        }
      }
    }
    return area;
  },

  checkOutPosition(x, y) {
    const tetramino = this.activeTetramino.block;
    for (let i = 0; i < tetramino.length; i++) {
      for (let j = 0; j < tetramino[i].length; j++) {
        if (tetramino[i][j] === 'o') continue;

        if (!this.area[y + i] ||
          !this.area[y + i][x + j] ||
          this.area[y + i][x + j] === 'x') {
          return false;
        }
      }
    }
    return true;
  },

  stopMove() {
    const { x, y, block: tetramino } = this.activeTetramino;

    for (let i = 0; i < tetramino.length; i++) {
      const row = tetramino[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] !== 'o') {
          this.area[y + i][x + j] = tetramino[i][j];
        }
      }
    }
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
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < area.length; y++) {
    const line = area[y];

    for (let x = 0; x < line.length; x++) {
      const block = line[x];
      if (block !== 'o') {
        context.fillStyle = '#3f484d';
        context.strokeStyle = 'white';
        context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
};

window.addEventListener('keydown', (event) => {
  const key = event.code;

  switch (key) {
    case 'ArrowLeft':
    case 'KeyA':
      game.moveLeft();
      showArea(game.viewArea);
      break;
    case 'ArrowRight':
    case 'KeyD':
      game.moveRight();
      showArea(game.viewArea);
      break;
    case 'ArrowDown':
    case 'KeyS':
      game.moveDown();
      showArea(game.viewArea);
      break;
    case 'ArrowUp':
    case 'KeyW':
      game.rotateTetramino();
      showArea(game.viewArea);
      break;

    default:
      break;
  }
});

showArea(game.viewArea);
