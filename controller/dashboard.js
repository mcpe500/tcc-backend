const { verifyToken } = require('../utils/jwtCommands');

module.exports = async function (req, res) {
    const { headers } = req;
    const { authorization } = headers;
    const [bearer,token] = authorization.split(" ");
    const isTrueToken = verifyToken(token);
    console.log(isTrueToken);
    return res.send(isTrueToken);
}