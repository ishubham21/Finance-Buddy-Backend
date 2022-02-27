const mongoose = require('mongoose')

const ParentSchema = new mongoose.Schema({
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
    children: {
        type: Array,    //[{ email: , name: }, { email: , name: }]
        default: []
    },
    sentRequests: {
        type: Array,    //[{ email: , name: }, { email: , name: }]
        default: []
    },
    assignedQuizzes: {
        type: Array,    //[{name, email, quizTopic}]
        default: [] 
    }
})

module.exports = mongoose.model("Parent", ParentSchema)