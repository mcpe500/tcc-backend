const express = require('express');
const app = express();
const cors = require('cors');

const router = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// ENDPOINT
app.use('/', router);

// Start the server
const port = 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
