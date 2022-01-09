const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
    Photo schema:
    username: String
    name: String
    url: String
    date: Date
*/
const photoSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: Date, required: true },
}, { 
    timestamps: true,
});

const Photo = mongoose.model('Photo', photoSchema); 

module.exports = Photo;