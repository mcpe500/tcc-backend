const env = require("../config/env.json");
const { JWT_SECRET, jwt_time } = env;
const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: function (user) {
        return jwt.sign(user, JWT_SECRET, {
            expiresIn: jwt_time
        });
    },
    verifyToken: function (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
