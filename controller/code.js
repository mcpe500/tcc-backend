const { callFetchSubmission } = require("../utils/editorCommands");
const { verifyToken } = require("../utils/jwtCommands");
const { judge0_server } = require("../config/env.json");
const axios = require("axios");

module.exports = async (req, res) => {
    try {
        const { headers } = req;
        const { authorization } = headers;
        const [bearer, token] = authorization.split(" ");
        const isTrueToken = verifyToken(token);
        console.log(isTrueToken);
        if (isTrueToken) {
            const { source_code, language_id } = req.body;
            console.log(source_code, language_id);

            await axios
                .post(judge0_server + "/submissions", {
                    source_code: source_code,
                    language_id: language_id,
                })
                .then(async (response) => {
                    const { token } = response.data;
                    const output = await callFetchSubmission(token);
                    return res.send({ authenticated: true, output });
                })
                .catch((error) => {
                    console.error(error);
                    return res.send({ authenticated: true });
                });
        } else {
            return res.send({ authenticated: false });
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};
