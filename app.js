const express = require('express');
const app = express();
const connect = require('./utils/DBconnection');
const Router = require('./routes/mainRouter');

require('dotenv').config("./config.env");

app.set('view engine', 'ejs');
app.use(express.json()); //parsing the application/json
app.use(express.urlencoded({
    extended: true
})); //parses the x-www-form-urlencoded
app.use(Router);
connect().then(result => {
    app.listen(8080, () => {
        console.log('running in port 8080..');
    });
});