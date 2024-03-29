const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Draw background image
const background = new Image();
background.src = 'background.jpg';
background.onload = function() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

// Your game logic goes here
