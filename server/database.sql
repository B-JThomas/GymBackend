CREATE DATABASE gymapp;

CREATE TABLE exercise (
  ExerciseID SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL UNIQUE,
  MuscleGroup VARCHAR(50) NOT NULL,
  MovementType VARCHAR(50) NOT NULL,
  Video TEXT,
  Description TEXT
);
