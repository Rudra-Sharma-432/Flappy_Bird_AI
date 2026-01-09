const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("myRange");
const rangeValue = document.getElementById("rangeValue");

canvas.width = innerWidth * 0.9 - 320;
canvas.height = innerHeight * 0.9;

document.getElementById("container").style.width = 300 - 10 + "px";
document.getElementById("container").style.height = canvas.height - 20 + "px";


/* -------------------------------- */
/* ----------- VARIALES ----------- */
/* -------------------------------- */

let timer = 10;
let autoNext = false;
let player_Or_AI = 1; // 0 - player & 1 - AI
let flapSpeed = -10;
let birdSize = 30;
let gravity = 1;
let gap = 120;
let thickness = 100;
let pipes = [];
let highScore = localStorage.getItem("player high score") * 1;
let AIhighScore = localStorage.getItem("AI high score") * 1;
let simulationSpeed = range.value;
let aliveBirdIndex = 0;


document.getElementById("playerHighScore").innerHTML = highScore;
document.getElementById("AIhighScore").innerHTML = AIhighScore;

pipes.push({ x: 600, y: Math.random() * (canvas.height - gap) });


/* ---------------------------------------------- */
/* ----------- SOME HELPFUL FUNCTIONS ----------- */
/* ---------------------------------------------- */

// DRWAING FUNCTIONS
function drawLine(xi, yi, xf, yf, color, size) {
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(xi, yi);
  ctx.lineTo(xf, yf);
  ctx.strokeStyle = color;
  ctx.stroke();
  // ctx.fillStyle = color;
  // ctx.fill();
  ctx.closePath();
}

function drawRect(x1, y1, x2, y2, x3, y3, x4, y4, color, size) {
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);

  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPipe(x, y) {
  drawRect(x, y, x + thickness, y, x + thickness, 0, x, 0, "#31da34ff", 1);
  drawRect(x, y + gap, x + thickness, y + gap, x + thickness, 1000, x, 1000, "#31da34ff", 1);
}
function drawPoint(x, y, color, size) {
  ctx.fillStyle = color;
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
}



// SET SIMULATION SPEED
range.addEventListener("input", function () {
  rangeValue.textContent = this.value;
  simulationSpeed = this.value;
  console.log(simulationSpeed);
});



// GENERATE "N" BIRDS
function generateBids(N) {
  const birds = [];
  for (let i = 0; i < N; i++) {
    let y = Math.floor(Math.random() * (canvas.height - 45) + 30);
    birds.push(new Bird(y));
    // birds[i].draw();
    // birds[i].randomize();
    // birds[i].calculate();
  }
  return birds;
}



// WAIT FUNCTION
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



// COPY WEIGHTS AND BAISES FUNCTION
let arrayAsString;
function copyArray(content) {
  if (content) {
    // copy baises
    var arrayAsString = JSON.stringify(birds[aliveBirdIndex].baises);


  } else {
    // copy weigths
    var arrayAsString = JSON.stringify(birds[aliveBirdIndex].weights);
  }

  navigator.clipboard.writeText(arrayAsString);
}



// UPDATE FUNCTION

async function update() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // Move all pipes and birds
  pipes.forEach(pipe => {
    pipe.x -= 3; // Assuming pipes move 2 pixels per frame
  });


  document.getElementById("liveAvgScore").innerHTML = 0;

  birds.forEach(bird => {
    if (bird.alive) {
      bird.u += gravity;
      if (bird.u > 13) {
        bird.u = 13;
      }
      // if (bird.u < -10) {
      //   bird.u = -10;
      // }
      bird.y += bird.u;
    }

    if (player_Or_AI && bird.alive) {
      drawPoint(120, bird.y, "#ffff00", birdSize);
    }

    if (bird.alive) {
      bird.score++;
    }

    document.getElementById("liveAvgScore").innerHTML = Math.floor((document.getElementById("liveAvgScore").innerHTML * 1 + bird.score) / 2);

  });

  // Filter out pipes and birds
  let oldPipeX = pipes[0].x;
  pipes = pipes.filter(pipe => pipe.x + thickness > 0);
  if (pipes[0].x - oldPipeX > 40) {
    document.getElementById("pipeCrossed").innerHTML = document.getElementById("pipeCrossed").innerHTML * 1 + 1;
  }


  for (let i = 0; i < birds.length; i++) {
    if (birds[i].alive &&
      (birds[i].y < 0 || birds[i].y > canvas.height ||
        ((pipes[0].x < 120 + (birdSize / 2) && pipes[0].x > 120 - thickness - (birdSize / 2)) && (birds[i].y < pipes[0].y + (birdSize / 2) || birds[i].y > pipes[0].y + gap - (birdSize / 2))))) {
      console.log("bird " + i + "th died");
      birds[i].alive = false;
    }

    if (birds[0].alive) {
      drawPoint(120, birds[0].y, "#ffff00", birdSize);
    }
  }


  // draw pipes and birds
  pipes.forEach(pipe => {
    drawPipe(pipe.x, pipe.y);
  });


  // Score
  if (!player_Or_AI) {
    document.getElementById("score").innerHTML = birds[0].score;
  }
  if (player_Or_AI && birds[aliveBirdIndex].score > AIhighScore) {
    AIhighScore = birds[aliveBirdIndex].score;
    localStorage.setItem("AI high score", AIhighScore);
    document.getElementById("AIhighScore").innerHTML = AIhighScore;
  }
  if (!player_Or_AI && birds[0].score > highScore) {
    highScore = birds[0].score;
    localStorage.setItem("player high score", highScore);
    document.getElementById("playerHighScore").innerHTML = highScore;
  }

  document.getElementById("bestBirdScore").innerHTML = document.getElementById("bestBirdScore").innerHTML * 1 + 1;


  for (let i = 0; i < birds.length; i++) {
    if (birds[i].alive == true) {
      aliveBirdIndex = i;
      break;
    }
  }

  // Generate pipes
  timer--;
  if (timer < 0) {
    // if (Math.random() > 0.5) {
    pipes.push({ x: 1130, y: Math.random() * (canvas.height - gap) });
    // }
    timer = 110;
  }

  // AI's actions
  if (player_Or_AI) {
    for (let i = 0; i < birds.length; i++) {
      birds[i].calculate();
    }
  }

  // Stop Game when all birds dies
  document.getElementById("aliveBirds").innerHTML = 0;

  const allBirdsAreDead = birds.every(bird => bird.alive === false);
  if (allBirdsAreDead) {
    autoNext = false;
    if (player_Or_AI) {
      train();
    }
  } else {

    birds.forEach(bird => {
      if (bird.alive == true) {
        document.getElementById("aliveBirds").innerHTML = document.getElementById("aliveBirds").innerHTML * 1 + 1;
      }
    });


  }

  if (autoNext) {
    await wait(70 * 1 / simulationSpeed);
    update();
  }
}



document.addEventListener('keydown', function (event) {
  // console.log('Key pressed:', event.key);

  if (event.key === "Enter") {
    if (!autoNext) {
      autoNext = true;
      player_Or_AI = (prompt("SELECT MODE!\n1 is for PLAYER and 2 is for AI", 1)) - 1;
      update();
    } else {
      autoNext = false;
    }
  }

  if (event.key === " ") {
    if (!player_Or_AI) {
      birds[0].u = flapSpeed;
    }

  }

  if (event.key === "Shift") {
    player_Or_AI = -1 * player_Or_AI + 1;

    if (!player_Or_AI) {
      birds.forEach(bird => {
        if (bird.alive) {
          bird.alive = false;
        }
      });
      birds[0].alive = true;
    }

  }

  // update();

});
