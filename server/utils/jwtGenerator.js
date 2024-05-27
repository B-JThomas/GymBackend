const jwt = require("jsonwebtoken");
require('dotenv').config();


function jwtGenerator(userID, userRole) {
    const payload = {
        user: {
            id: userID,
            role: userRole 
        }
    };
    
    return jwt.sign(payload, process.env.JWTSECRET, {expiresIn: "1hr" })
}

module.exports = jwtGenerator;