const express = require("express");
const router = express.Router();
const pool = require("../../db");

//=====WORKOUTSTRUCTURE ENDPOINTS=====//

//GET all WorkoutStructures
router.get("/", async (req, res) => {
    try {
        const allWorkouts = await pool.query("SELECT * FROM workoutStructure");
        res.json(allWorkouts.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//GET a WorkoutStructure by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await pool.query("SELECT * FROM workoutStructure WHERE WorkoutID = $1", [id]);
        res.json(workout.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//CREATE WorkoutStructure
router.post("/", async (req, res) => {
    try {
        //View Body
        console.log(req.body);

        //Logic
        const { Name, GroupedSets, ExerciseIDs, SetIDs } = req.body;
        const newWorkout = await pool.query(
            `INSERT INTO workoutStructure (Name, GroupedSets, ExerciseIDs, SetIDs)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [Name, GroupedSets, ExerciseIDs, SetIDs]
        );
        res.json(newWorkout.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// UPDATE WorkoutStructure
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, GroupedSets, ExerciseIDs, SetIDs } = req.body;
  
      const existingWorkout = await pool.query('SELECT * FROM workoutStructure WHERE WorkoutID = $1', [id]);
  
      if (existingWorkout.rows.length === 0) {
        return res.status(404).json({ error: 'Workout not found' });
      }
  
      const updatedWorkout = await pool.query(
        `UPDATE workoutStructure SET
           Name = COALESCE($1, Name),
           GroupedSets = COALESCE($2, GroupedSets),
           ExerciseIDs = COALESCE($3, ExerciseIDs),
           SetIDs = COALESCE($4, SetIDs)
         WHERE WorkoutID = $5
         RETURNING *`,
        [Name, GroupedSets, ExerciseIDs, SetIDs, id]
      );
  
      res.json(updatedWorkout.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETE WorkoutStructure
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const workout = await pool.query('DELETE FROM workoutStructure WHERE WorkoutID = $1 RETURNING *', [id]);
  
      if (workout.rows.length === 0) {
        return res.status(404).json({ error: 'Workout not found' });
      }
  
      res.json({ message: 'Workout deleted successfully', workout: workout.rows[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
