const mongoose = require('mongoose');
const connect = async () => {
    mongoose.connect('mongodb+srv://dev_risers:somyamongo1@shop.xcr2h.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(result => {
        return result
    }).catch((err) => {
        return err
    });
}

module.exports = connect;