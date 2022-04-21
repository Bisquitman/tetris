import { BLOCK_SIZE, COLUMNS, ROWS } from '../index.js';

export class View {
  constructor(container) {
    this.container = container;

    this.preview();
  }

  colors = {
    J: '#14274E',
    I: '#394867',
    O: '#9BA4B4',
    L: '#7A58FF',
    2: '#396EB0',
    T: '#DADDFC',
    S: '#3f484d',
  };

  canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');

  preview() {
    this.container.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      height: ${BLOCK_SIZE * ROWS}px;
      text-align: center;
      color: #FF376A;
      font-size: ${BLOCK_SIZE * 10}%;
      font-family: sans-serif;
      font-weight: 900;
    `;
    this.container.textContent = 'Press ENTER to start';
  }

  init() {
    this.container.style.cssText = '';
    this.container.textContent = '';

    this.canvas.classList.add('game-area');
    this.container.append(this.canvas);
    this.canvas.width = BLOCK_SIZE * COLUMNS;
    this.canvas.height = BLOCK_SIZE * ROWS;
  }

  showArea(area) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          this.context.fillStyle = this.colors[block];
          this.context.strokeStyle = 'white';
          this.context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          this.context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  };
}
