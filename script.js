const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

// Игровые параметры
const playerWidth = 20;
const playerHeight = 20;
let playerX = canvas.width / 2 - playerWidth / 2;
const playerSpeed = 5;

const blockWidth = 30;
const blockHeight = 30;
const blockSpeed = 2;
let blocks = []; // Массив для хранения блоков
let score = 0;

let rightPressed = false;
let leftPressed = false;
let gameOver = false;

// Обработчики событий клавиатуры
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

// Функция для создания нового блока
function createBlock() {
  const x = Math.random() * (canvas.width - blockWidth);
  blocks.push({ x: x, y: 0 });
}

// Функция для обновления состояния игры
function update() {
  if (gameOver) return;

  // Управление игроком
  if (rightPressed && playerX < canvas.width - playerWidth) {
    playerX += playerSpeed;
  } else if (leftPressed && playerX > 0) {
    playerX -= playerSpeed;
  }

  // Обновление позиции блоков
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].y += blockSpeed;

    // Проверка на столкновение
    if (
      blocks[i].x < playerX + playerWidth &&
      blocks[i].x + blockWidth > playerX &&
      blocks[i].y < playerHeight &&
      blocks[i].y + blockHeight > 0
    ) {
      gameOver = true;
      alert("Игра окончена! Счет: " + score);
    }

    // Удаление блоков, вышедших за границы экрана
    if (blocks[i].y > canvas.height) {
      blocks.splice(i, 1);
      score++;
      scoreElement.textContent = "Счет: " + score;
      i--; // Уменьшаем i, чтобы не пропустить следующий блок
    }
  }

  // Создание новых блоков (с некоторой вероятностью)
  if (Math.random() < 0.02) {
    createBlock();
  }
}

// Функция для отрисовки игры
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка канвы

  // Отрисовка игрока
  ctx.fillStyle = "blue";
  ctx.fillRect(playerX, 0, playerWidth, playerHeight);

  // Отрисовка блоков
  ctx.fillStyle = "red";
  for (let i = 0; i < blocks.length; i++) {
    ctx.fillRect(blocks[i].x, blocks[i].y, blockWidth, blockHeight);
  }
}

// Основной игровой цикл
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Запуск игры
gameLoop();
