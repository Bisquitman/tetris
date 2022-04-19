/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
var BLOCK_SIZE = 25; // Логика игры

var game = {
  area: [['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['x', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'x', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'x'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'], ['o', 'x', 'o', 'o', 'o', 'o', 'x', 'o', 'o', 'x'], ['x', 'x', 'o', 'x', 'x', 'o', 'x', 'x', 'o', 'x'], ['x', 'o', 'o', 'x', 'x', 'o', 'x', 'o', 'x', 'x']],
  activeTetromino: {
    x: 3,
    y: 0,
    block: [['o', 'x', 'o'], ['o', 'x', 'o'], ['x', 'x', 'o']]
  },
  moveLeft: function moveLeft() {
    this.activeTetromino.x -= 1;
  },
  moveRight: function moveRight() {
    this.activeTetromino.x += 1;
  },
  moveDown: function moveDown() {
    this.activeTetromino.y += 1;
  },
  rotateTetromino: function rotateTetromino() {},

  get viewArea() {
    var area = JSON.parse(JSON.stringify(this.area));
    var _this$activeTetromino = this.activeTetromino,
        x = _this$activeTetromino.x,
        y = _this$activeTetromino.y,
        tetromino = _this$activeTetromino.block;

    for (var i = 0; i < tetromino.length; i++) {
      var row = tetromino[i];

      for (var j = 0; j < row.length; j++) {
        if (row[j] === 'x') {
          area[y + i][x + j] = tetromino[i][j];
        }
      }
    }

    return area;
  }

}; // Отрисовка

var container = document.querySelector('.container');
var canvas = document.createElement('canvas');
canvas.classList.add('game-area');
container.append(canvas);
canvas.width = BLOCK_SIZE * 10;
canvas.height = canvas.width * 2;
var context = canvas.getContext('2d');

var showArea = function showArea(area) {
  for (var y = 0; y < area.length; y++) {
    var line = area[y];

    for (var x = 0; x < line.length; x++) {
      var block = line[x];

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
/******/ })()
;