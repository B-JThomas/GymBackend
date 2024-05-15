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
-- MAPPED
CREATE TABLE programStructure (
  ProgramID SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL UNIQUE,
  SplitIDs INTEGER[] NOT NULL,
  Duration INTEGER NOT NULL
);




--  =========================================



-- USERLOGIN MODEL
CREATE TABLE userLogin (
  UserID SERIAL PRIMARY KEY,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Username VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL
  -- Roloes ?? 
);


-- USERDATA
CREATE TABLE userInfo (
  UserID SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL UNIQUE,
  -- DateOfBirth
  -- Weight
  -- Height
  -- Measurements ?? 

);