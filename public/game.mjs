export const socket = io();

export const fruits = {
  fruits: {}
};

export const Pixel = {
  x: 0,
  y: 0,
  px: 20,
  py: 20
};

export function movements() {

  function directionLeft() {

    Pixel.x -= Pixel.px
    if (Pixel.x < 0) {
      Pixel.x = 0
    };
  };

  function directionUp() {

    Pixel.y -= Pixel.py
    if (Pixel.y < 0) {
      Pixel.y = 0;
    }
  };

  function directionRight() {

    Pixel.x += Pixel.px
    if (Pixel.x > 560) {
      Pixel.x = 560;
    }
  };

  function directionDown() {

    Pixel.y += Pixel.py
    if (Pixel.y > 580) {
      Pixel.y = 580;
    }
  };

  return { directionLeft, directionUp, directionRight, directionDown }
};

export function deleteFruits() {

  function deleteFruitPositionLeft(opposingPlayer) {

    for (const i in fruits.fruits) {
      const fruitX = fruits.fruits[i].x;
      const fruitY = fruits.fruits[i].y;
      if (fruitX === opposingPlayer.parameters.x && fruitY === opposingPlayer.parameters.y) {
        delete fruits.fruits[i].x;
        delete fruits.fruits[i].y;

      }
    }
  };

  function deleteFruitPositionUp(opposingPlayer) {

    for (const i in fruits.fruits) {
      const fruitX = fruits.fruits[i].x;
      const fruitY = fruits.fruits[i].y;

      if (fruitX === opposingPlayer.parameters.x && fruitY === opposingPlayer.parameters.y) {
        delete fruits.fruits[i].x;
        delete fruits.fruits[i].y;
      }
    }
  };

  function deleteFruitPositionRight(opposingPlayer) {

    for (const i in fruits.fruits) {
      const fruitX = fruits.fruits[i].x;
      const fruitY = fruits.fruits[i].y;
      if (fruitX === opposingPlayer.parameters.x && fruitY === opposingPlayer.parameters.y) {
        delete fruits.fruits[i].x;
        delete fruits.fruits[i].y;
      }
    }
  };

  function deleteFruitPositionDown(opposingPlayer) {

    for (const i in fruits.fruits) {
      const fruitX = fruits.fruits[i].x;
      const fruitY = fruits.fruits[i].y;

      if (fruitX === opposingPlayer.parameters.x && fruitY === opposingPlayer.parameters.y) {
        delete fruits.fruits[i].x;
        delete fruits.fruits[i].y;
      }
    }
  };

  return { deleteFruitPositionLeft, deleteFruitPositionUp, deleteFruitPositionRight, deleteFruitPositionDown }
}

export function collision() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  for (const i in fruits.fruits) {
    const fruitX = fruits.fruits[i].x;
    const fruitY = fruits.fruits[i].y;

    if (fruitX === Pixel.x && fruitY === Pixel.y) {
      ctx.clearRect(fruitX,fruitY,30,30);
      ctx.fillRect(fruitX, fruitY, 30, 30);

      sound();

      delete fruits.fruits[i].x;
      delete fruits.fruits[i].y;

      const points = {
        id: socket.id
      };

      socket.emit('sendPoints', points);

    };
  };
};

function sound(){
  const sound = document.getElementById('sound');
  sound.play();
};