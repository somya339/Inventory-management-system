const mongoose = require('mongoose');
const connect = async () => {
    return mongoose.connect('mongodb+srv://dev_risers:somyamongo1@shop.xcr2h.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = connect;