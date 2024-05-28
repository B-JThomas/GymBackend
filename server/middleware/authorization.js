const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if(!jwtToken) {
            return res.status(403).json("Not Authorized");
        }

        //errpr
        const payload = jwt.verify(jwtToken, process.env.JWTSECRET);

        req.user = payload.user;

    } catch (err) {
        console.error(err.message);
        return res.status(500).json("Server Error");
    }
    next();
}

const roleAuthorization = (roles) => {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            res.status(401).json("Not authorized for this role");
        }
    };
};

module.exports = { authorization, roleAuthorization };