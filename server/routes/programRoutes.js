const express = require("express");
const router = express.Router();
const pool = require("../db");

//=====PROGRAMSTRUCTURE ENDPOINTS=====//

//GET all ProgramStructures
router.get("/", async (req, res) => {
    try {
        const allPrograms = await pool.query("SELECT * FROM programStructure");
        res.json(allPrograms.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//GET a ProgramStructure by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const program = await pool.query("SELECT * FROM programStructure WHERE ProgramID = $1", [id]);
        res.json(program.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//CREATE ProgramStructure
router.post("/", async (req, res) => {
    try {
        const { Name, SplitIDs, Duration } = req.body;
        const newProgram = await pool.query(
            "INSERT INTO programStructure (Name, SplitIDs, Duration) VALUES ($1, $2, $3) RETURNING *",
            [Name, SplitIDs, Duration]
        );
        res.json(newProgram.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// UPDATE ProgramStructure
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, SplitIDs, Duration } = req.body;
  
      const existingProgram = await pool.query('SELECT * FROM programStructure WHERE ProgramID = $1', [id]);
  
      if (existingProgram.rows.length === 0) {
        return res.status(404).json({ error: 'Program not found' });
      }
  
      const updatedProgram = await pool.query(
        "UPDATE programStructure SET Name = COALESCE($1, Name), SplitIDs = COALESCE($2, SplitIDs), Duration = COALESCE($3, Duration) WHERE ProgramID = $4 RETURNING *",
        [Name, SplitIDs, Duration, id]
      );
  
      res.json(updatedProgram.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETE ProgramStructure
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const program = await pool.query('DELETE FROM programStructure WHERE ProgramID = $1 RETURNING *', [id]);
  
      if (program.rows.length === 0) {
        return res.status(404).json({ error: 'Program not found' });
      }
  
      res.json({ message: 'Program deleted successfully', program: program.rows[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
