let avgScore = 0;
let bestBirdIndex = 0;
let bestBirdScore = 0;


function train() {

  avgScore = 0;
  bestBirdIndex = 0;
  bestBirdScore = 0;

  for (let i = 0; i < birds.length; i++) {
    avgScore = (avgScore + birds[i].score) / 2;

    if (birds[i].score > bestBirdScore) {
      bestBirdScore = birds[i].score;
      bestBirdIndex = i;
    }
  }
  document.getElementById("avgScore").innerHTML = Math.floor(avgScore);


  // copy DNA
  for (let n = 0; n < birds.length; n++) {
    birds[n].score = 0;
    if (n != bestBirdIndex) { // for fast performence

      // weights
      for (let i = 0; i < birds[0].weights.length; i++) {
        for (let j = 0; j < birds[0].weights[i].length; j++) {
          for (let k = 0; k < birds[0].weights[i][j].length; k++) {
            birds[n].weights[i][j][k] = birds[bestBirdIndex].weights[i][j][k];
          }
        }
      }

      // baises
      for (let i = 0; i < birds[0].baises.length; i++) {
        for (let j = 0; j < birds[0].baises[i].length; j++) {
          birds[n].baises[i][j] = birds[bestBirdIndex].baises[i][j];
        }
      }

    }
  }


  // mutate DNA
  for (let i = 2; i < birds.length; i++) {
    // birds[i].mutate(i/(2*birds.length));
  }


  // revive all birds
  for (let i = 0; i < birds.length; i++) {
    birds[i].alive = true;
    birds[i].y = Math.floor(Math.random() * (canvas.height - 45) + 30);
  }

  // reset surroundings
  pipes = [];
  pipes.push({ x: 1130, y: Math.random() * (canvas.height - gap) });
  timer = 110;

  autoNext = true;
  // update();
  document.getElementById("bestBirdScore").innerHTML = 0;
  document.getElementById("pipeCrossed").innerHTML = 0;
}
