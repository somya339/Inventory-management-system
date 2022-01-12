const mongoose = require('mongoose');
const connect = async () => {
    console.log()
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(result => {
        return result
    }).catch((err) => {
        return err
    });
}
mongoose.set('useCreateIndex', true);
module.exports = connect;