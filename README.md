# roombaVacuum
Implementation of aima Inteligent Random Agent in javascript.

The implementation have 3 entities:
- Environment: a matrix of tiles.
- Tiles: a piece of the environment, that can be clean or dirt.
- Agent: the smart entity of the system that can move inside the environment and clean a dirt tile.

It enables to choose the number of columns and rows of the environment before the start. The default values are both two.
The dirts of the tiles are randomized in 30%, which means that every ten tiles, three are going to be dirt.

## How is the agent random?
An agent can choose between all available positions to move randomly.
The available positions are chosen according to the following rules:
- An agent can move in one of four directions (up, down, left or right) if it respect the following rules;
- An agent can't move outside the environment;
- An agent will not choose to move back to his last position in the environment.

This aproach was chosen following the premises that the agent doesn't know his environmnent, it only knows when it is in one of the borders.

## How to use?
1. Open index.html at the root of the project.
2. Choose how many columns and rows using the inputs at the top right corner (if you want to use the default values, leave it blank).
3. Click at "Start Roomba" to setup the environment and start the agent.