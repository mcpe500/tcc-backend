const { verifyToken } = require("../utils/jwtCommands");

module.exports = (req, res) => {
    try {
        const { headers } = req;
        const { authorization } = headers;

        if (!authorization) {
            return res.status(401).send(false);
        }

        const [bearer, token] = authorization.split(" ");

        if (bearer !== "Bearer" || !token) {
            return res.status(401).send(false);
        }

        const isTrueToken = verifyToken(token);

        if (isTrueToken) {
            return res.status(200).send(true);
        } else {
            return res.status(401).send(false);
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).send(false);
    }
};
