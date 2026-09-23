# 🐦 Flappy Bird AI

### Evolutionary Neural Network from Scratch

A Flappy Bird simulation where a population of AI-controlled birds uses a custom neural network and evolutionary optimization to learn increasingly effective navigation behavior.

Built from scratch with **JavaScript, HTML5 Canvas, neural networks, and evolutionary algorithms**.

---

## 🎥 Demo

> Add your live demo link here.

**Live Demo:** `YOUR_DEMO_URL`

**Source Code:** `YOUR_GITHUB_URL`

---

## 🧠 Overview

The goal of this project was to explore whether a simple neural network could produce useful game-playing behavior when combined with evolutionary optimization.

Instead of manually programming rules such as:

```text
IF bird is too low → flap
IF pipe is close → flap
```

each bird is controlled by its own neural network.

The network receives information about the current game state and produces the bird's action.

A population of **20 birds** is evaluated simultaneously. Birds that survive longer receive higher fitness scores. The best-performing network is then propagated to the next generation with random mutations applied to its parameters.

The process repeats:

```text
Simulation
    ↓
Fitness Evaluation
    ↓
Selection
    ↓
Replication
    ↓
Mutation
    ↓
Next Generation
```

---

## 🏗️ Neural Network Architecture

The neural network uses a compact:

```text
5 → 3 → 1
```

architecture.

### Input Layer

Five values describing the current environment are provided to the network:

| Input             | Description                                   |
| ----------------- | --------------------------------------------- |
| Bird Y Position   | Current vertical position of the bird         |
| Vertical Velocity | Current vertical movement/velocity            |
| Pipe Distance     | Horizontal distance to the relevant pipe      |
| Vertical Offset   | Bird's vertical position relative to the pipe |
| Gap Size          | Vertical size of the pipe gap                 |

### Hidden Layer

The hidden layer contains **3 neurons**.

### Output Layer

The network produces a single output representing the bird's decision:

```text
              Neural Network
                    │
              5 → 3 → 1
                    │
                  tanh
                    │
             ┌──────┴──────┐
             ↓             ↓
           FLAP         NO FLAP
```

The network uses the **tanh activation function**.

---

## 🔬 How the AI Makes a Decision

At every simulation step, the bird's environment is converted into five input values.

Conceptually:

```text
Game Environment
       │
       ▼
┌─────────────────────┐
│ 5 Environmental     │
│ Inputs              │
│                     │
│ • Bird Y             │
│ • Velocity           │
│ • Pipe Distance      │
│ • Vertical Offset    │
│ • Gap Size           │
└──────────┬──────────┘
           │
           ▼
     Neural Network
         5 → 3 → 1
           │
           ▼
       tanh output
           │
           ▼
      Flap / No Flap
```

The network therefore maps the current game state to an action.

---

# 🧬 Evolutionary Learning

The project does not train the network using backpropagation or gradient descent.

Instead, the network parameters are optimized through an evolutionary process.

Each bird has its own:

* Neural-network weights
* Biases
* Behavior
* Fitness score

The population is evaluated inside the same game environment.

### 1. Population

A generation contains:

```text
20 AI-controlled birds
```

Each bird starts with its own network parameters.

### 2. Simulation

The birds interact with the game environment simultaneously.

Birds that avoid obstacles for longer continue accumulating fitness.

### 3. Fitness Evaluation

The current fitness function is based on survival duration.

Every simulation update in which a bird remains alive contributes to its score.

Conceptually:

```text
Longer survival
      ↓
Higher fitness
      ↓
Better candidate for reproduction
```

### 4. Selection

After the generation finishes, the bird with the highest score is selected as the best-performing individual.

### 5. Replication

The best bird's neural-network parameters are copied into the next population.

This includes its:

* Weights
* Biases

### 6. Mutation

Random mutations are applied to the copied parameters.

The current mutation strength is:

```text
0.4
```

Conceptually:

```text
Best Network
      │
      ├── Copy
      ├── Copy + Mutation
      ├── Copy + Mutation
      ├── Copy + Mutation
      └── ...
```

The resulting population is then evaluated again.

---

# 📊 Fitness Tracking

The simulation tracks generation-level statistics including:

* Generation number
* Best fitness
* Average fitness

Conceptually:

```text
Fitness
  │
  │                         ╭────
  │                    ╭────╯
  │               ╭────╯
  │          ╭────╯
  │     ╭────╯
  │─────╯
  └──────────────────────────────
             Generation
```

These statistics make it possible to observe how the population behaves across generations.

> Training graphs should be generated from actual runs of the project rather than estimated or manually created values.

---

# 🧪 Evolutionary Training Loop

The complete process can be summarized as:

```text
┌─────────────────────┐
│   INITIAL POPULATION│
│      20 BIRDS       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    RUN SIMULATION   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   MEASURE FITNESS   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    SELECT BEST      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ COPY WEIGHTS/BIASes │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       MUTATION      │
└──────────┬──────────┘
           │
           ▼
      NEXT GENERATION
           │
           └───────────────► Repeat
```

---

# 🎮 Game Modes

The project includes both gameplay and AI simulation functionality.

### Human Mode

The game can be played manually.

### AI Mode

The population of neural-network-controlled birds interacts with the environment automatically.

This makes it possible to compare the original gameplay mechanics with the AI-controlled simulation.

---

# ⚡ Simulation

The simulation provides real-time information about the AI population and its performance.

Relevant statistics include:

* AI best score
* Average score
* Best bird score
* Pipe crossings
* Generation information
* Simulation speed

The simulation speed can also be adjusted to observe evolutionary behavior more quickly.

---

# 💾 Model Parameters

The application exposes the neural-network parameters of the best-performing bird.

This includes the learned:

* Weights
* Biases

The project therefore provides a way to inspect and copy the parameters produced by the evolutionary process.

---

# 🛠️ Technologies

| Technology              | Purpose                         |
| ----------------------- | ------------------------------- |
| JavaScript              | Core game and AI implementation |
| HTML5 Canvas            | Game rendering and simulation   |
| CSS                     | Interface and presentation      |
| Neural Networks         | Decision-making system          |
| Evolutionary Algorithms | Parameter optimization          |
| Simulation              | Population-based evaluation     |
| Local Storage           | Persistent application data     |

---

# 📁 Project Structure

```text
Flappy-Bird-AI/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   └── ...
│
└── README.md
```

> Update this section if the repository contains additional files or folders.

---

# 🧩 Core Architecture

The project can be viewed as two interconnected systems:

```text
                    FLAPPY BIRD AI
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
       GAME SIMULATION            AI SYSTEM
             │                         │
       ┌─────┼─────┐             ┌────┴────┐
       │     │     │             │         │
     Bird   Pipes Physics     Neural Net Evolution
       │     │     │             │         │
       └─────┴─────┘             │    Selection
             │                   │    Mutation
             ▼                   │         │
        GAME STATE ──────────────┘         │
             │                             │
             ▼                             │
          FITNESS ◄────────────────────────┘
```

The game simulation provides the environment.

The neural network converts the environment into an action.

The evolutionary system uses fitness to determine which network parameters should be propagated into the next generation.

---

# 📈 Training Results

This section should contain results from actual runs of the project.

Recommended metrics:

| Metric                |     Value |
| --------------------- | --------: |
| Population Size       |        20 |
| Network Architecture  | 5 → 3 → 1 |
| Activation            |      tanh |
| Mutation Strength     |       0.4 |
| Number of Generations |     `TBD` |
| Best Fitness          |     `TBD` |
| Average Fitness       |     `TBD` |

### Fitness Over Generations

Add a graph here showing:

* Best fitness
* Average fitness
* Generation number

```text
[ INSERT REAL TRAINING GRAPH HERE ]
```

The results should be generated from the existing implementation rather than using fabricated values.

---

# 🔍 What Makes This Project Interesting?

This project was built as an exploration of how relatively simple components can produce emergent game-playing behavior.

The implementation combines:

* A custom neural network
* Environmental state representation
* Population-based simulation
* Fitness evaluation
* Selection
* Parameter replication
* Random mutation
* Generation tracking

None of these components individually solves Flappy Bird.

The interesting behavior emerges from repeatedly evaluating and modifying the neural-network parameters.

---

# 📚 What I Learned

This project helped me explore several concepts in practical terms:

### Neural Networks

Understanding how inputs flow through layers of neurons to produce an output.

### Activation Functions

Using `tanh` to transform neural-network calculations.

### Evolutionary Optimization

Understanding how selection and mutation can be used to search a parameter space.

### Fitness Functions

Designing a simple measurement of performance based on survival.

### Simulation

Running multiple agents in the same environment and evaluating their behavior.

### Visualization

Displaying both the simulation and generation-level performance data.

### Building AI From Scratch

Implementing the core neural-network and evolutionary logic directly in JavaScript rather than relying on a machine-learning framework.

---

# ⚠️ Limitations

The current implementation is intentionally simple.

Some limitations include:

* Small population size
* Simple fitness function
* Elitist selection focused on the best-performing bird
* Random parameter mutation
* Small neural-network architecture
* No gradient-based training
* No standard NEAT implementation
* Limited diversity mechanisms within the population

These constraints make the project easier to understand while also providing clear opportunities for future experimentation.

---

# 🔮 Possible Future Experiments

These are potential experiments rather than features currently implemented:

* Experiment with different network architectures
* Compare different population sizes
* Test different mutation strengths
* Experiment with alternative fitness functions
* Compare different activation functions
* Investigate stronger population-diversity strategies
* Visualize neural-network behavior during gameplay
* Compare multiple evolutionary strategies
* Analyze convergence across repeated training runs

---

# 🚫 What This Project Does Not Claim

For technical accuracy, this project should not be described as:

* A standard NEAT implementation
* Reinforcement learning
* Backpropagation-based training
* Gradient-descent optimization

The current implementation uses a custom neural network combined with fitness-based selection, parameter replication, and random mutation.

---

# 🌱 Project Context

This project began as an exploration of neural networks and evolutionary algorithms through a simple game environment.

Flappy Bird provides a useful test environment because the objective is straightforward:

> Survive as long as possible while navigating obstacles.

That makes it possible to experiment with AI decision-making, fitness evaluation, and evolutionary optimization while keeping the environment visually understandable.

---

# ⭐ Project Highlights

```text
🐦 Flappy Bird Simulation
🧠 Custom Neural Network
🔢 5 → 3 → 1 Architecture
🧬 Evolutionary Optimization
👥 20-Agent Population
🎯 Fitness-Based Selection
🔀 Weight & Bias Mutation
📊 Generation Statistics
⚡ Real-Time Simulation
💻 JavaScript + HTML5 Canvas
```

---

## 👨‍💻 Author

Built as a hands-on exploration of neural networks, evolutionary algorithms, and simulation using JavaScript.

---

## 📜 License

Add your preferred license here.

If this repository does not currently have a license, consider adding one before publishing it as an open-source project.
