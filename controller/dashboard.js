const { verifyToken } = require('../utils/jwtCommands');

module.exports = async function (req, res) {
    try {
        const { token } = req;

        if (token) {
            const { username, email } = token;
            return res.send({
                username: username,
                email: email,
            });
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).send("Internal Server Error");
    }
};
