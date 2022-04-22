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

  preview() {
    this.container.textContent = '';
    const preview = document.createElement('div');
    preview.innerHTML = `Press "Enter" <br>to start`;
    preview.style.cssText = `
      border: 3px solid black;
      text-align: center;
      font-family: sans-serif;
      font-size: 200%;
      font-weight: 900;
      color: #FF376A;
      padding: 50px;
      grid-column: 1/3;
    `;

    this.container.append(preview);
  }

  init() {
    this.container.textContent = '';

    this.canvas.classList.add('game-area');
    this.container.append(this.canvas);
    this.canvas.width = BLOCK_SIZE * COLUMNS;
    this.canvas.height = BLOCK_SIZE * ROWS;
  }

  createScoreBlock() {
    const scoreBlock = document.createElement('div');
    scoreBlock.style.cssText = `
      border: 1px solid #9BA4B4;
      font-size: 18px;
      padding: 20px;
      grid-area: score;
    `;
    const linesElem = document.createElement('p');
    const scoreElem = document.createElement('p');
    const levelElem = document.createElement('p');
    const recordElem = document.createElement('p');

    scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

    this.container.append(scoreBlock);

    return (lines, score, level, record) => {
      linesElem.textContent = `lines: ${lines}`;
      scoreElem.textContent = `score: ${score}`;
      levelElem.textContent = `level: ${level}`;
      recordElem.textContent = `record: ${record}`;
    };
  }

  createNextTetraminoBlock() {
    const nextTetraminoBlock = document.createElement('div');
    nextTetraminoBlock.style.cssText = `
      width: ${BLOCK_SIZE * 4}px;
      height: ${BLOCK_SIZE * 4}px;
      border: 1px solid #9BA4B4;
      padding: 10px;
      grid-area: next;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    nextTetraminoBlock.append(canvas);

    this.container.append(nextTetraminoBlock);

    return (tetramino) => {
      canvas.width = BLOCK_SIZE * tetramino.length;
      canvas.height = BLOCK_SIZE * tetramino.length;
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < tetramino.length; y++) {
        const line = tetramino[y];

        for (let x = 0; x < line.length; x++) {
          const block = line[x];
          if (block !== 'o') {
            context.fillStyle = this.colors[block];
            context.strokeStyle = 'white';
            context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          }
        }
      }
    };
  }

  showArea(area) {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          context.fillStyle = this.colors[block];
          context.strokeStyle = 'white';
          context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  };
}
