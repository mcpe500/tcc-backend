const { verifyToken } = require("../utils/jwtCommands");

module.exports = async function (req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer" || !token) {
            return res.status(401).json({ error: "Invalid token format" });
        }

        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return res.status(401).json({ error: "Invalid token" });
        }

        req.token = decodedToken;
        req.isAuthenticated = true;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
