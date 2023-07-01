const { verifyToken } = require('../utils/jwtCommands');

module.exports = async function (req, res) {
    try {
        const { headers } = req;
        const { authorization } = headers;
        const [bearer, token] = authorization.split(" ");
        const isTrueToken = verifyToken(token);
        
        return res.send({
            username:isTrueToken.username,
            email:isTrueToken.email
        });
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).send("Internal Server Error");
    }
}
