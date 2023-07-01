const { verifyToken } = require("../utils/jwtCommands");

module.exports = async function (req, res) {
    try {
        const { headers } = req;
        const { authorization } = headers;
        const [bearer, token] = authorization.split(" ");
        const isTrueToken = verifyToken(token);
        console.log(isTrueToken);
        if (isTrueToken) {
            return res.send({ authenticated: true });
        }
        return res.send({ authenticated: false });
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).send({ error: "Internal Server Error", authenticated: false });
    }
}