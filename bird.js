class Bird {
  constructor(y) {
    this.alive = true;
    this.y = y;
    this.u = 0;
    this.dis = 0;
    this.top_dis = 0;
    this.score = 0;
    // this.error = 0;


    this.nodes = [];
    this.weights = [];
    this.baises = [];

    // setup nodes, weights and baises
    let layers = [5, 3, 1]; //TODO : also change its value at "mutate()"
    // input: y, u, dis, top-dis, gap

    for (let i = 0; i < layers.length; i++) {
      // setup nodes
      this.nodes.push(new Array);

      // setup weights and baises
      if (i > 0) { // means (no. of layers - 1) times
        this.weights.push(new Array);
        this.baises.push(new Array);

        // setup weights
        for (let j = 0; j < layers[i]; j++) {
          this.weights[i - 1].push(new Array);

          for (let k = 0; k < layers[i - 1]; k++) {
            // this.weights[i - 1][j][k] = Math.random() * 2 - 1;
            this.weights[i - 1][j].push(Math.random() * 2 - 1);

          }
        }

        //setup baises
        for (let j = 0; j < layers[i]; j++) {
          this.baises[i - 1].push(Math.random() * 2 - 1);
        }
      }
    }

    this.nodes[0][0] = this.y;
    this.nodes[0][4] = gap;

    this.weights =[[[-0.33429844244114315,0.7611426632104002,-0.7050168242421692,-0.058511181407098115,1.2664563552582002],
    [1.4594446173076776,-0.04453546098899805,0.6266322774144609,0.45045144714874435,0.011394148178481472],
    [-0.06281341741809046,0.8896910627318105,-0.01242555810800059,1.8762615718787292,-1.3223728105531556]],
    [[-0.6244990346756957,-0.8657550085875348,1.4875239260540982]]];

    this.baises = [[-0.06947579620136725,-0.5228913533622043,-0.4785225032927199],
    [1.339813931909866]];
    
  }

  setInputs() {
    if (pipes[0].x < 120 - thickness - (birdSize / 2)) {
      this.dis = pipes[1].x - 120;
      this.top_dis = this.y - pipes[0].y;
    } else {
      this.dis = pipes[0].x - 120;
      this.top_dis = this.y - pipes[0].y;
    }

    this.nodes[0][0] = this.y; // y
    this.nodes[0][1] = this.u; // u
    this.nodes[0][2] = this.dis; // dis
    this.nodes[0][3] = this.top_dis; // top_dis
    this.nodes[0][4] = gap; // gap
  }

  draw() {
    drawPoint(120, this.y, "#ffff00", birdSize);
  }

  mutate(strength) {
    let layers = [5, 3, 1]; //TODO : also change its value at "constructor()"
    for (let i = 0; i < layers.length - 1; i++) {

      // randomize weights
      for (let j = 0; j < layers[i + 1]; j++) {
        for (let k = 0; k < layers[i]; k++) {
          this.weights[i][j][k] = this.weights[i][j][k] + strength * (2 * Math.random() - 1);
        }
      }

      // randomize baises
      for (let j = 0; j < layers[i + 1]; j++) {
        this.baises[i][j] = this.baises[i][j] + strength * (2 * Math.random() - 1);
      }
    }
  }

  calculate() {
    let layers = [5, 3, 1];

    this.setInputs();


    for (let i = 1; i < layers.length; i++) { // for hidden and output layers
      for (let j = 0; j < layers[i]; j++) { // for nodes form selected layers
        // calc the value of nodes of 2nd(index = 1) layers
        let a = 0;
        for (let k = 0; k < layers[i - 1]; k++) {
          a += this.nodes[i - 1][k] * this.weights[i - 1][j][k];
        }


        a += this.baises[i - 1][j];
        this.nodes[i][j] = Math.tanh(a);

      }

    }

    if (this.nodes[2][0] > 0) {
      this.u = flapSpeed;
    }
  }
}

const birds = generateBids(20);
birds[0].draw();
