import { players } from "./view.mjs";
const player = players();

document.addEventListener('keydown', (event) => {
  const codeKey = event.code;

  if (codeKey == 'ArrowLeft') {
    player.arrowLeft();
  }

  if (codeKey == 'ArrowUp') {
    player.arrowUp();
  }

  if (codeKey == 'ArrowRight') {
    player.arrowRight();
  }

  if (codeKey == 'ArrowDown') {
    player.arrowDown();
  }

});