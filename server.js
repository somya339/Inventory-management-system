const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const app = express();
const connect = require('./utils/DBconnection');
const Router = require('./routes/mainRouter');
const photosRouter = require('./routes/photosRouter');
const usersRouter = require('./routes/users')
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.json()); //parsing the application/json
app.use(express.urlencoded({
    extended: true
})); //parses the x-www-form-urlencoded
app.use(cors());
env.config();
app.use(express.static("public"));

// let uri = process.env.MONGO_URI;
// console.log(uri);
// mongoose.connect("mongodb+srv://dev_risers:somyamongo1@shop.xcr2h.mongodb.net/test?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// })


app.use('/', Router);
app.use('/photos', photosRouter);
app.use('/users', usersRouter);
connect().then(result => {
    app.listen(port, () => {
        console.log(`running in port ${port}..`);
    });

}).catch((err) => console.log(err.message));