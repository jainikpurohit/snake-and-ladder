# Snake and Ladder - Classic Board Game

Welcome to the Snake and Ladder Game! This is a classic board game built with React for the frontend and Express.js with MongoDB for the backend. The game includes player vs computer functionality, game state saving and loading, and interactive gameplay with playing log.

## Table of Contents
   * [Game Rules](#game-rules)
   * [Features](#features)
   * [Deploy Application](#deploy-application)
      + [Installation](#installation)
      + [Running the Backend](#running-the-backend)
      + [Running the Frontend](#running-the-frontend)
   * [Application Backend](#application-backend)
      + [Overview](#overview)
      + [Features](#features-1)
      + [Technologies Used](#technologies-used)
      + [Getting Started](#getting-started)
         - [Prerequisites](#prerequisites)
      + [API Endpoints](#api-endpoints)
         - [Save Game State](#save-game-state)
         - [Load Game State](#load-game-state)
      + [File Structure](#file-structure)
      + [Code Quality and Security](#code-quality-and-security)
   * [Application Frontend](#application-frontend)
      + [Overview](#overview-1)
      + [Features](#features-2)
      + [Project Structure](#project-structure)
      + [Configuration](#configuration)
         - [Board Styling](#board-styling)
         - [CSS Styling](#css-styling)
   * [Additional Notes](#additional-notes)
   * [Upcoming Features](#upcoming-features)
   * [Known Issues](#known-issues)
   * [License](#license)
   * [Contributing](#contributing)
   * [Contact](#contact)

## Game Rules

1. Roll the dice to move forward.
2. Land on a snake to slide down.
3. Land on a ladder to climb up.
4. The player who reaches the 100th box first wins.
5. You must roll the exact number needed to land on the 100th box.

## Features

- Dice roll mechanics
- Movement tracking for both player and computer
- Snakes and ladders that change player positions
- Activity log for game events
- Save and load game state
- Computer takes automatic turns

## Deploy Application

### Installation

1. Clone the repository.
```bash
git clone git@github.com:jainikpurohit/snake-and-ladder.git
```

### Running the Backend

1. Navigate into the backend project directory.
```bash
cd snake-and-ladder/backend
```
2. Install dependencies.
```bash
npm install
```
3. Start the MongoDB server if it's not already running.
4. Start the backend server.
```bash
npm start
```
5. The server will be running on http://localhost:5000.

### Running the Frontend
1. Navigate into the frontend project directory.
```bash
cd snake-and-ladder/frontend
```
2. Install dependencies.
```bash
npm install
```
3. Start the frontend server.
```bash
npm start
```
4. The server will be running on http://localhost:3000.

## Application Backend

### Overview

This backend application provides APIs for managing the state of a Snake and Ladder game. It allows saving and retrieving game state, with data persisted in a MongoDB database. The backend is built using Express.js, Mongoose, and various middleware for enhanced functionality and security.

### Features

- **Save Game State**: Save or update the current state of the game.
- **Load Game State**: Retrieve the state of a game using a unique game ID.
- **Error Handling**: Centralized error handling with informative responses.
- **Validation**: Request validation to ensure data integrity.
- **Logging**: HTTP request logging for debugging and monitoring.
- **Security**: Basic security practices including rate limiting and helmet protection.

### Technologies Used

- **Node.js**: Runtime for the backend server.
- **Express.js**: Framework for building the API.
- **Mongoose**: ODM for MongoDB.
- **MongoDB**: Database for storing game state.
- **Helmet**: Middleware for security headers.
- **Morgan**: Middleware for HTTP request logging.
- **express-rate-limit**: Middleware for rate limiting API requests.
- **express-validator**: Middleware for validating incoming requests.

### Getting Started

#### Prerequisites

- Node.js and npm
- MongoDB (local or remote)

### API Endpoints

#### Save Game State

- **URL**: `/api/save`
- **Method**: `POST`
- **Request Body**:
  - `gameId`: Unique identifier for the game.
  - `playerPosition`: The current position of the player.
  - `computerPosition`: The current position of the computer.
  - `activePlayer`: Indicates whether 'player' or 'computer' is the active player.
  - `diceRoll`: The result of the last dice roll.
  - `gameOver`: Indicates if the game is over.
  - `activityLog`: The log of game activities.
- **Response**: The saved or updated game state object.
  ```json
  {
    "gameId": "string",
    "playerPosition": "number",
    "computerPosition": "number",
    "activePlayer": "string",
    "diceRoll": "number",
    "gameOver": "boolean",
    "activityLog": "array"
  }
  ```
- **Errors**:
  - `400`: If `gameId` is missing or invalid data is provided.
  - `500`: If there is a server error.

#### Load Game State

- **URL**: `/api/load/:gameId`
- **Method**: `GET`
- **URL Params**:
  - `gameId`: The unique identifier for the game.
- **Response**: The game state object corresponding to the `gameId`.
  ```json
  {
    "gameId": "string",
    "playerPosition": "number",
    "computerPosition": "number",
    "activePlayer": "string",
    "diceRoll": "number",
    "gameOver": "boolean",
    "activityLog": "array"
  }
  ```
- **Errors**:
  - `404`: If the game state is not found.
  - `500`: If there is a server error.

### File Structure

- `/config`
  - `db.js`: MongoDB connection configuration.
  - `middleware.js`: Middleware configuration.
- `/models`
  - `GameState.js`: Mongoose model for game state.
- `/routes`
  - `gameRoutes.js`: API routes for game state management.
- `/middleware`
  - `errorHandler.js`: Centralized error handling middleware.
- `app.js`: Main application file.
- `server.js`: Starting point for an application server.

### Code Quality and Security

- **Validation**: Using `express-validator` to validate incoming requests.
- **Error Handling**: Centralized error handling to ensure consistent error responses.
- **Logging**: `morgan` is used for HTTP request logging.
- **Security**: `helmet` and `express-rate-limit` for basic security and rate limiting.

## Application Frontend

### Overview

This repository contains the frontend code for a Snake and Ladder game built with React. The game allows players to compete against a computer opponent, with features for saving and loading game states. The user interface includes dynamic updates and styled game components.

### Features

- **Player vs. Computer**: Compete against an AI opponent.
- **Save and Load Game**: Save the current game state and load it later to resume play.
- **Customizable Game Board**: Styled board with snakes and ladders.
- **Activity Log**: Shows the history of game activities with real-time updates.

### Project Structure

The project is organized as follows:

- **public/**: Contains the static `index.html` file.
- **src/**:
  - **components/**: Contains React components and it's CSS files such as `Board.js`, `GameControls.js`, `ActivityLog.js`, and `RightPanel.js`.
  - **hooks/**: Includes game logic to handle various effects and button events.
  - **services/**: Contains utility functions related to the load and save game events.
  - **utils/**: Contains utility functions related to the game logic.
  - **App.js**: Main application component that sets up routes and integrates components.
  - **index.js**: Entry point for the React application.

### Configuration

#### Board Styling

- **Snake Cells**: These cells have a red background. The box number is displayed at the top, and the destination number is shown at the bottom.
- **Ladder Cells**: These cells have a green background. The box number is displayed at the bottom, and the destination number is shown at the top.

#### CSS Styling

- **App.css**: Contains global styles for the application.

## Additional Notes

- Ensure that your backend server is properly configured to handle API requests.
- Connect to the appropriate MongoDB instance if saving and loading game states.

## Upcoming Features
- **Multiplayer Mode**: Add support for multiple players.
- **Customizable Board**: Allow users to customize the size and layout of the board and reshuffle snake and ladder positions.
- **Save and Load**: Implement more advanced game state saving and loading features and includes prompts.
- **Winner Announcement**: Eye catching winner announcement above the board.
- **User Authentication**: Add support for User authentication and display all previous game stored by same user.
- **Observability**: Measure metric and add more Observability for the application.

## Known Issues
- **Misalignment of Board Cells**: Some cells on the board may be misaligned with others.
- **Dice Roll Text**: Dice Roll value is not being reflected correctly when you load game.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your proposed changes.

## Contact

For any questions or comments, feel free to reach out at @jainikpurohit on GitHub.
