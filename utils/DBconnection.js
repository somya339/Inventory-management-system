const mongoose = require('mongoose');
const connect = async () => {
    console.log(process.env.MONGO_URI)
    mongoose.connect('mongodb+srv://dev_risers:somyamongo1@shop.xcr2h.mongodb.net/test?retryWrites=true&w=majority', {
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