export class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
  }

  init(keyCode) {
    window.addEventListener('keydown', (event) => {
      if (keyCode.includes(event.code)) {
        this.view.init();
        this.start();
      }
    })
  }

  start() {
    this.view.showArea(this.game.viewArea);
    this.game.createUpdatePanels(this.view.createScoreBlock(), this.view.createNextTetraminoBlock());

    const tick = () => {
      const time = (1100 - 100 * this.game.level)
      if (this.game.gameOver) return;
      setTimeout(() => {
        this.game.moveDown();
        this.view.showArea(this.game.viewArea);
        tick();
      }, time > 100 ? time : 100);
    };
    tick();

    window.addEventListener('keydown', (event) => {
      const key = event.code;

      switch (key) {
        case 'ArrowLeft':
        case 'KeyA':
          this.game.moveLeft();
          this.view.showArea(this.game.viewArea);
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.game.moveRight();
          this.view.showArea(this.game.viewArea);
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.game.moveDown();
          this.view.showArea(this.game.viewArea);
          break;
        case 'ArrowUp':
        case 'KeyW':
          this.game.rotateTetramino();
          this.view.showArea(this.game.viewArea);
          break;

        default:
          break;
      }
    });
  }
}
