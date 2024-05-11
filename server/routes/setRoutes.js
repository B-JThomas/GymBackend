const express = require("express");
const router = express.Router();
const pool = require("../db");


//=====SETSTRUCTURE ENDPOINTS=====//


//GET all exercises
router.get("/", async(req,res) => {
    try {
        const allSets = await pool.query("SELECT * FROM setStructure")
        res.json(allSets.rows);

    } catch (error) {
        console.error(error.message)
    }
})


//GET a exercise by ID
router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const setStructure = await pool.query("SELECT * FROM setStructure WHERE SetID = $1", [id]);

        res.json(setStructure.rows[0]);

    } catch (error) {p
        console.error(error.message)
    }
})

//CREATE exercise
router.post("/", async(req, res) => {
    try {
        //View Body
        console.log(req.body);

        //Logic
        const { Name, Reps } = req.body;

        const newSet = await pool.query(
            `INSERT INTO setStructure (Name, Reps)
             VALUES ($1, $2) RETURNING *`,
            [Name, Reps]
          );
        
        res.json(newSet.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
});


// UPDATE an exercise by ID
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, Reps} = req.body;
  
      const existingSet = await pool.query('SELECT * FROM setStructure WHERE SetID = $1', [id]);
  
      if (existingSet.rows.length === 0) {
        return res.status(404).json({ error: 'Set not found' });
      }
  
      const updatedSet = await pool.query(
        `UPDATE setStructure SET
           Name = COALESCE($1, Name),
           Rows = COALESCE($2, Rows)
         WHERE SetID = $3
         RETURNING *`,
        [Name, Reps, id]
      );
  
      res.json(updatedSet.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

//DELETE exercise 
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const setStructure = await pool.query('DELETE FROM setStructure WHERE SetID = $1 RETURNING *', [id]);
  
      if (setStructure.rows.length === 0) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
  
      res.json({ message: 'Exercise deleted successfully', setStructure: setStructure.rows[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;