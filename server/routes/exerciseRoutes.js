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
router.get("/filter/:MovementType", async(req, res) => {
    try {
        const { MovementType } = req.params;
        const exercises = await pool.query("SELECT * FROM exercise WHERE MovementType = $1", [MovementType]);

        res.json(exercises.rows);

    } catch (error) {
        console.error(error.message)
    }
})


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


//UPDATE a exercise

//DELETE a exercise



module.exports = router;