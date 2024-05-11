# Gym Backend

A Node.js backend for a gym application using Express and PostgreSQL. It provides a RESTful API to manage exercises, allowing CRUD operations with filtering options.

## Features

- Full CRUD functionality for exercises.
- Filter exercises by muscle group and movement type.
- PostgreSQL database integration via `pg` and `Pool`.
- CORS-enabled API.
- Environment-based configuration.

## Requirements

- Node.js >= 14.x
- PostgreSQL >= 12.x

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/gym-backend.git
    cd gym-backend
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` File:**

    Create a `.env` file in the project root with your PostgreSQL credentials.

    ```env
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=gym_database
    DB_HOST=localhost
    DB_PORT=5432
    PORT=5001
    ```

4. **Create the Database Table:**

    Connect to your PostgreSQL instance and run the following SQL query to create the `exercise` table.

    ```sql
    CREATE TABLE exercise (
      ExerciseID SERIAL PRIMARY KEY,
      Name VARCHAR(100) NOT NULL UNIQUE,
      MuscleGroup VARCHAR(50) NOT NULL,
      MovementType VARCHAR(50) NOT NULL,
      Video TEXT,
      Description TEXT
    );
    ```

## Usage

1. **Run the Server:**

    ```bash
    npm run dev
    ```

    The server will start at `http://localhost:5001`.

2. **API Endpoints:**

    - **GET /api/exercise:** Get all exercises.
    - **GET /api/exercise/:id:** Get a specific exercise by ID.
    - **GET /api/exercise/musclegroup/:muscleGroup:** Get exercises by muscle group.
    - **GET /api/exercise/movementtype/:type:** Get exercises by movement type.
    - **GET /api/exercise/filter/:muscleGroup/:movementType:** Filter exercises by muscle group and movement type.
    - **POST /api/exercise:** Create a new exercise.
    - **PUT /api/exercise/:id:** Update an existing exercise.
    - **DELETE /api/exercise/:id:** Delete an exercise by ID.

3. **Example Request Bodies:**

    - **POST (Create Exercise):**

      ```json
      {
        "Name": "Push-Up",
        "MuscleGroup": "Chest",
        "MovementType": "Compound",
        "Video": "https://example.com/pushup-video",
        "Description": "An upper body exercise targeting the chest, shoulders, and triceps."
      }
      ```

    - **PUT (Update Exercise):**

      ```json
      {
        "Name": "Updated Push-Up",
        "MuscleGroup": "Chest",
        "MovementType": "Compound",
        "Video": "https://example.com/updated-pushup-video",
        "Description": "Updated description: An upper body exercise targeting the chest, shoulders, and triceps."
      }
      ```

