const jwt = require("jsonwebtoken");
require('dotenv').config();


function jwtGenerator(userID) {
    const payload = {
        user: userID
    }

    return jwt.sign(payload, process.env.JWTSECRET, {expiresIn: "1hr" })
}

module.exports = jwtGenerator;