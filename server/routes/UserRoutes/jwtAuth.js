const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtGenerator = require("../../utils/jwtGenerator");
const pool = require("../../db");
const validInfo = require("../../middleware/validinfo");
const { authorization, roleAuthorization } = require("../../middleware/authorization");

//CREATE userLogin
router.post("/register", validInfo, async (req, res) => {
    try {
        const { Username, Email, Password } = req.body;
        //UPDATE
        const user = await pool.query("SELECT * FROM userLogin WHERE Email = $1", [Email]);
        
        if(user.rows.length != 0) {
            return res.status(401).send("User Already Exists");
        }

        const HashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await pool.query(
            "INSERT INTO userLogin (Username, Email, Password) VALUES ($1, $2, $3) RETURNING *",
            [Username, Email, HashedPassword]
        );

        const token = jwtGenerator(newUser.rows[0].userid, newUser.rows[0].role);
        
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//CREATE userLogin
router.post("/login", validInfo, async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const user = await pool.query(
            'SELECT * FROM userLogin WHERE username = $1',
            [Username]
        );


        if (user.rows.length > 0) {
            const validPassword = await bcrypt.compare(Password, user.rows[0].password);
            if (!validPassword) return res.status(400).send('Invalid Password');

            const token = jwtGenerator(user.rows[0].userid, user.rows[0].role)
            res.json({ token });

        } else {
            res.status(401).send('Invalid Username');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get("/verify", authorization, async (req, res) => {
    try {

        res.json(true);
    } catch (err) {

        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

router.get("/role-verify", authorization, roleAuthorization(['user', 'admin']), async (req, res) => {
    try {
        //req.user has the payload
        //res.json(req.user)

        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});


module.exports = router;