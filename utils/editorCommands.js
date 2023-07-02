const axios = require("axios");

async function fetchSubmission(submissionId, data_status_id) {
    while (data_status_id <= 2)
        try {
            const response = await axios.get(
                "http://localhost:2358/submissions/" + submissionId
            );
            const data = response.data;

            if (data.status.id > 2) {
                const output = data.stdout || data.stderr;
                return output;
            } else {
                data_status_id = data.status.id
            }
        } catch (error) {
            console.error(error);
        }
}

module.exports = {
    callFetchSubmission: async (submissionId) => {
        const finalOutput = await fetchSubmission(submissionId, 0);
        console.log(finalOutput);
        return finalOutput;
    },
};
