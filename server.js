const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const path = require('path');
env.config({
    path: path.join(__dirname, "./utils/.env")
});
const app = express();
const connect = require('./utils/DBconnection');
const Router = require('./routes/mainRouter');
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended: true
})); //parses the x-www-form-urlencoded
app.use(express.json()); //parsing the application/json
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


app.use(Router);
connect().then(result => {
    app.listen(port, () => {
        console.log(`running in port ${port}..`);
    });

}).catch((err) => console.log(err.message));