const mongoose = require('mongoose')

const ChildSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    parent: {
        type: Array,    //[{ email: , name: }]
        default: []
    }
})

module.exports = mongoose.model("Child", ChildSchema)