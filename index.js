const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Define a route
app.post('/login', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Start the server
const port = 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
