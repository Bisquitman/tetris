export class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
  }

  init(keyCode1, keyCode2) {
    window.addEventListener('keydown', (event) => {
      if (event.code === keyCode1 || event.code === keyCode2) {
        this.view.init();
        this.start();
      }
    })
  }

  start() {
    this.view.showArea(this.game.viewArea);

    setInterval(() => {
      this.game.moveDown();
      this.view.showArea(this.game.viewArea);
    }, 500);

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
