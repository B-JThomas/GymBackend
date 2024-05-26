const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const pool = require("../../db");

//=====userLogin ENDPOINTS=====//

//GET all userLogins
router.get("/", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM userLogin");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//GET a userLogin by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM userLogin WHERE UserID = $1", [id]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});


// UPDATE userLogin
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Username, Email, Password, Role } = req.body;
        //UPDATE
        const HashedPassword = Password;
        const existingProgram = await pool.query('SELECT * FROM userLogin WHERE UserID = $1', [id]);

        if (existingUser.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = await pool.query(
            "UPDATE userLogin SET Username = COALESCE($1, Username), Email = COALESCE($2, Email), Password = COALESCE($3, Password), Role = COALESCE($4, Role) WHERE UserID = $5 RETURNING *",
            [Username, Email, HashedPassword, Role, id]
        );

        res.json(updatedUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETE userLogin
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('DELETE FROM userLogin WHERE UserID = $1 RETURNING *', [id]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', user: user.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
