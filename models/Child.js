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
        type: Array,    //[{, { email: , name: } email: , name: }]
        default: []
    },
    recievedRequest: {
        type: Array,    //[{ email: , name: }]
        default: []
    },
    assignedQuizzes: {
        type: Array,
        default: []
    },
    assignedLessons: {
        type: Array,
        default: []
    },
    lessonHistory: {
        type: Array,
        default: []
    },
    quizHistory: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Child", ChildSchema)