const express = require("express");
const router = express.Router();
const pool = require("../db");

//=====SPLITSTRUCTURE ENDPOINTS=====//

//GET all SplitStructures
router.get("/", async (req, res) => {
    try {
        const allSplits = await pool.query("SELECT * FROM splitStructure");
        res.json(allSplits.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//GET a SplitStructure by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const splitStructure = await pool.query("SELECT * FROM splitStructure WHERE SplitID = $1", [id]);
        res.json(splitStructure.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//CREATE SplitStructure
router.post("/", async (req, res) => {
    try {
        const { Name, WorkoutIDs } = req.body;
        const newSplit = await pool.query(
            "INSERT INTO splitStructure (Name, WorkoutIDs) VALUES ($1, $2) RETURNING *",
            [Name, WorkoutIDs]
        );
        res.json(newSplit.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// UPDATE SplitStructure
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, WorkoutIDs } = req.body;
  
      const existingSplit = await pool.query('SELECT * FROM splitStructure WHERE SplitID = $1', [id]);
  
      if (existingSplit.rows.length === 0) {
        return res.status(404).json({ error: 'Split not found' });
      }
  
      const updatedSplit = await pool.query(
        "UPDATE splitStructure SET Name = COALESCE($1, Name), WorkoutIDs = COALESCE($2, WorkoutIDs) WHERE SplitID = $3 RETURNING *",
        [Name, WorkoutIDs, id]
      );
  
      res.json(updatedSplit.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETE SplitStructures
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const splitStructure = await pool.query('DELETE FROM splitStructure WHERE SplitID = $1 RETURNING *', [id]);
  
      if (splitStructure.rows.length === 0) {
        return res.status(404).json({ error: 'Split not found' });
      }
  
      res.json({ message: 'Split deleted successfully', splitStructure: splitStructure.rows[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
