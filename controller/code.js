const { callFetchSubmission } = require("../utils/editorCommands");
const { judge0_server } = require("../config/env.json");
const axios = require("axios");

module.exports = async (req, res) => {
    try {
        const { source_code, language_id } = req.body;

        const response = await axios.post(judge0_server + "/submissions", {
            source_code,
            language_id,
        });

        const { token } = response.data;
        const output = await callFetchSubmission(token);

        return res.send({ authenticated: true, output });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};
