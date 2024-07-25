# Snake and Ladder Game Backend

## Overview

This backend application provides APIs for managing the state of a Snake and Ladder game. It allows saving and retrieving game state, with data persisted in a MongoDB database. The backend is built using Express.js, Mongoose, and various middleware for enhanced functionality and security.

## Features

- **Save Game State**: Save or update the current state of the game.
- **Load Game State**: Retrieve the state of a game using a unique game ID.
- **Error Handling**: Centralized error handling with informative responses.
- **Validation**: Request validation to ensure data integrity.
- **Logging**: HTTP request logging for debugging and monitoring.
- **Security**: Basic security practices including rate limiting and helmet protection.

## Technologies Used

- **Node.js**: Runtime for the backend server.
- **Express.js**: Framework for building the API.
- **Mongoose**: ODM for MongoDB.
- **MongoDB**: Database for storing game state.
- **Helmet**: Middleware for security headers.
- **Morgan**: Middleware for HTTP request logging.
- **express-rate-limit**: Middleware for rate limiting API requests.
- **express-validator**: Middleware for validating incoming requests.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or remote)

### Installation

1. Clone the repository.
```bash
git clone git@github.com:jainikpurohit/snake-and-ladder.git
```
2. Navigate into the project directory.
```bash
cd snake-and-ladder/backend
```
3. Install dependencies.
```bash
npm install
```

### Running the Application

1. Start the MongoDB server if it's not already running.
2. Start the backend server.
```bash
npm start
```
3. The server will be running on http://localhost:5000.

## API Endpoints

### Save Game State

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

### Load Game State

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

## File Structure

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

## Code Quality and Security

- **Validation**: Using `express-validator` to validate incoming requests.
- **Error Handling**: Centralized error handling to ensure consistent error responses.
- **Logging**: `morgan` is used for HTTP request logging.
- **Security**: `helmet` and `express-rate-limit` for basic security and rate limiting.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your proposed changes.

## Contact

For any questions or comments, feel free to reach out at @jainikpurohit on GitHub.
