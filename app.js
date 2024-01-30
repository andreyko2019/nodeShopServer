const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});
