CREATE DATABASE gymapp;


--  =========================================


-- EXERCISE MODEL
-- DONE
CREATE TABLE exercise (
  ExerciseID SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL UNIQUE,
  MuscleGroup VARCHAR(50) NOT NULL,
  MovementType VARCHAR(50) NOT NULL,
  Video TEXT,
  Description TEXT
);

-- SETSTRUCTURE MODEL
-- DONE
CREATE TABLE setStructure (
  SetID SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL UNIQUE,
  Reps INTEGER[] NOT NULL
);

-- WORKOUTSTRUCTURE MODEL
-- DONE
CREATE TABLE workoutStructure (
  WorkoutID SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL UNIQUE,
  GroupedSets INTEGER[] NOT NULL, 
  ExerciseIDs INTEGER[] NOT NULL, 
  SetIDs INTEGER[] NOT NULL
);


-- SPLITSTRUCTURE MODEL
-- MADE
CREATE TABLE splitStructure (
  SplitID SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL UNIQUE,
  WorkoutIDs INTEGER[] NOT NULL
);


-- PROGRAMSTRUCTURE MODEL
-- MADE
CREATE TABLE programStructure (
  ProgramID SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL UNIQUE,
  SplitIDs INTEGER[] NOT NULL,
  Duration INTEGER NOT NULL
);




--  =========================================



-- USERLOGIN MODEL
-- MADE
CREATE TABLE userLogin (
  UserID SERIAL PRIMARY KEY,
  Username VARCHAR(255) NOT NULL UNIQUE,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  Role VARCHAR(255) DEFAULT 'user'
);


-- USERDATA
-- MODELLED
CREATE TABLE userInfo (
  UserID INTEGER NOT NULL,
  Name VARCHAR(255) NOT NULL UNIQUE,
  DateOfBirth DATE,
  Weight DECIMAL(5, 2),
  Height DECIMAL(4, 2),
  Gender VARCHAR(50),
  FOREIGN KEY (UserID) REFERENCES userLogin(UserID)
);



--  =========================================



-- USEREXERCISES
-- CONTENT EXAMPLE
CREATE TABLE userExercises (
    ExerciseID SERIAL PRIMARY KEY,
    UserID INTEGER NOT NULL,
    Name VARCHAR(255) NOT NULL,
    MuscleGroup VARCHAR(255),
    MovementType VARCHAR(255),
    Video TEXT,
    Description TEXT,
    Visibility BOOLEAN DEFAULT FALSE,  
    Status VARCHAR(50) DEFAULT 'Pending', 
    FOREIGN KEY (UserID) REFERENCES userLogin(UserID)
);