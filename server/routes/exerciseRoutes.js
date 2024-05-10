const express = require("express");
const router = express.Router();
const pool = require("../db");


//=====EXERCISE ENDPOINTS=====//


//GET all exercises
router.get("/", async(req,res) => {
    try {
        const allExericses = await pool.query("SELECT * FROM exercise")
        res.json(allExericses.rows);

    } catch (error) {
        console.error(error.message)
    }
})


//GET a exercise by ID
router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const exercise = await pool.query("SELECT * FROM exercise WHERE ExerciseID = $1", [id]);

        res.json(exercise.rows[0]);

    } catch (error) {p
        console.error(error.message)
    }
})

//GET some exercises by muscle group
router.get("/musclegroup/:muscleGroup", async(req, res) => {
    try {
        const { muscleGroup } = req.params;
        const exercises = await pool.query("SELECT * FROM exercise WHERE MuscleGroup = $1", [muscleGroup]);

        res.json(exercises.rows);

    } catch (error) {
        console.error(error.message)
    }
})

//GET some exercises by muscle group and type
router.get('/filter/:muscleGroup/:movementType', async (req, res) => {
    try {
      const { muscleGroup, movementType } = req.params;
      const exercises = await pool.query(
        'SELECT * FROM exercise WHERE MuscleGroup = $1 AND MovementType = $2',
        [muscleGroup, movementType]
      );
  
      if (exercises.rows.length === 0) {
        return res.status(404).json({ error: 'No exercises found' });
      }
  
      res.json(exercises.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//CREATE exercise
router.post("/", async(req, res) => {
    try {
        //View Body
        console.log(req.body);

        //Logic
        const { Name, MuscleGroup, MovementType, Video, Description } = req.body;

        const newExercise = await pool.query(
            `INSERT INTO exercise (Name, MuscleGroup, MovementType, Video, Description)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [Name, MuscleGroup, MovementType, Video, Description]
          );
        
        res.json(newExercise.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
});


// UPDATE an exercise by ID
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, MuscleGroup, MovementType, Video, Description } = req.body;
  
      const existingExercise = await pool.query('SELECT * FROM exercise WHERE ExerciseID = $1', [id]);
  
      if (existingExercise.rows.length === 0) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
  
      const updatedExercise = await pool.query(
        `UPDATE exercise SET
           Name = COALESCE($1, Name),
           MuscleGroup = COALESCE($2, MuscleGroup),
           MovementType = COALESCE($3, MovementType),
           Video = COALESCE($4, Video),
           Description = COALESCE($5, Description)
         WHERE ExerciseID = $6
         RETURNING *`,
        [Name, MuscleGroup, MovementType, Video, Description, id]
      );
  
      res.json(updatedExercise.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

//DELETE exercise 
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const exercise = await pool.query('DELETE FROM exercise WHERE ExerciseID = $1 RETURNING *', [id]);
  
      if (exercise.rows.length === 0) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
  
      res.json({ message: 'Exercise deleted successfully', exercise: exercise.rows[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;