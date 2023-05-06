const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//this lets us define schema

const stateSchema = new Schema({
    stateCode: {
        type : String,
        required: true,
        unique: true
    },
    funfacts:[{
        type: String
    }]
});

module.exports = mongoose.model('State', stateSchema);