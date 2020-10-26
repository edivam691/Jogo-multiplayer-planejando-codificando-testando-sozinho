import { socket } from "./game.mjs";
const socketIo = socket;
import { Pixel } from "./game.mjs";
const player = Pixel;
import { movements } from "./game.mjs";
const movement = movements();
import { fruits } from "./game.mjs";
const fruit = fruits
import { deleteFruits } from "./game.mjs";
const deleteFruit = deleteFruits();
import { collision } from "./game.mjs";
const listOfPoints_1 = document.getElementById
  ('listOfPoints_1');
const listOfPoints_2 = document.getElementById
  ('listOfPoints_2');
const adversePlayerScoreboard = document.createElement('td');
const localPlayerScore = document.createElement('td');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let idFruit = 0;
let playersList;
const pointsTable = [];

generatePlayer();

function generatePlayer() {

  const cX = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580];

  const cY = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580];

  const x = getRandomIntInclusive(0, 30);
  const y = getRandomIntInclusive(0, 29);

  player.x = cX[x];
  player.y = cY[y];
};

function getRandomIntInclusive(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;

};


export function players() {

  function arrowLeft() {

    ctx.fillStyle = '#0000ff';
    ctx.clearRect(player.x, player.y, 30, 30);
    movement.directionLeft();
    ctx.fillRect(player.x, player.y, 30, 30);

    socketIo.emit('sendPlayerLeft', player);

    collision();
  };

  function arrowUp() {

    ctx.fillStyle = '#0000ff';
    ctx.clearRect(player.x, player.y, 30, 30);
    movement.directionUp()
    ctx.fillRect(player.x, player.y, 30, 30);

    socketIo.emit('sendPlayerUp', player);

    collision();
  };

  function arrowRight() {

    ctx.fillStyle = '#0000ff';
    ctx.clearRect(player.x, player.y, 30, 30);
    movement.directionRight();
    ctx.fillRect(player.x, player.y, 30, 30);

    socketIo.emit('sendPlayerRight', player);

    collision();
  };

  function arrowDown() {

    ctx.fillStyle = '#0000ff';
    ctx.clearRect(player.x, player.y, 30, 30);
    movement.directionDown();
    ctx.fillRect(player.x, player.y, 30, 30);

    socketIo.emit('sendPlayerDown', player);

    collision();
  };

  return { arrowLeft, arrowUp, arrowRight, arrowDown }
};

socketIo.on('receiverPlayerLeft', (dataLeft) => {
  const opposingPlayer = dataLeft;

  if (opposingPlayer.id != socket.id) {

    ctx.clearRect(opposingPlayer.parameters.x + 20, opposingPlayer.parameters.y, 30, 30);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(opposingPlayer.parameters.x, opposingPlayer.parameters.y, 30, 30);

    deleteFruit.deleteFruitPositionLeft(opposingPlayer);
  };
});

socketIo.on('receiverPlayerUp', (dataUp) => {
  const opposingPlayer = dataUp;

  if (opposingPlayer.id != socket.id) {

    ctx.clearRect(opposingPlayer.parameters.x, opposingPlayer.parameters.y + 20, 30, 30);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(opposingPlayer.parameters.x, opposingPlayer.parameters.y, 30, 30);

    deleteFruit.deleteFruitPositionUp(opposingPlayer);
  };
});

socketIo.on('receiverPlayerRight', (dataRight) => {
  const opposingPlayer = dataRight;

  if (opposingPlayer.id != socket.id) {

    ctx.clearRect(opposingPlayer.parameters.x - 20, opposingPlayer.parameters.y, 30, 30);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(opposingPlayer.parameters.x, opposingPlayer.parameters.y, 30, 30);

    deleteFruit.deleteFruitPositionRight(opposingPlayer);

  };
});

socketIo.on('receiverPlayerDown', (dataDonw) => {
  const opposingPlayer = dataDonw;

  if (opposingPlayer.id != socket.id) {

    ctx.clearRect(opposingPlayer.parameters.x, opposingPlayer.parameters.y - 20, 30, 30);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(opposingPlayer.parameters.x, opposingPlayer.parameters.y, 30, 30);

    deleteFruit.deleteFruitPositionDown(opposingPlayer);
  };
});


function generateFruit(x, y) {

  idFruit++

  fruit.fruits[idFruit] = {
    x: x,
    y: y
  }

  ctx.fillStyle = '#008000';
  ctx.fillRect(x, y, 30, 30);
};

socketIo.on('previousPixels', (coordinates) => {

  generateFruit(coordinates.x, coordinates.y);
});

socketIo.on('listOfPlayers', (listOfPlayers) => {
  playersList = listOfPlayers
});

socketIo.on('receiverPoints', (playerPoints) => {


  for (let i = 0; i < playersList.length; i++) {

    if (playersList[i] == playerPoints.id) {

      pointsTable[i] = playerPoints

    }
  }

  adversePlayerScoreboard.innerHTML = '';

  pointDisplay(pointsTable);

  function pointDisplay(pointsTable) {

    for (const i in pointsTable) {

      if (socketIo.id == pointsTable[i].id) {

        localPlayerScore.innerHTML = '';

        localPlayerScore.innerHTML = `<strong>ID{${pointsTable[i].id}}  {${pointsTable[i].point}}PONTOS<strong>`

        localPlayerScore.style.textAlign = 'center';

        localPlayerScore.style.color = '#0000ff';

        listOfPoints_1.appendChild(localPlayerScore);

      } else {

        adversePlayerScoreboard.innerHTML += `<br><strong>ID{${pointsTable[i].id}}  {${pointsTable[i].point}}PONTOS<strong><br>`;

        adversePlayerScoreboard.style.textAlign = 'center';

        adversePlayerScoreboard.style.color = '#ff0000'

        listOfPoints_2.appendChild(adversePlayerScoreboard);

      };
    };
  };
});