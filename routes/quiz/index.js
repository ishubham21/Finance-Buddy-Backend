const router = require('express').Router()
const quizzes = require('../../assets/quizzes')

const Parent = require('./../../models/Parent')
const Child = require('./../../models/Child')

const { findChildByEmail } = require('../../controllers/childValidators')
const { findParentByEmail } = require('../../controllers/parentValidators')

const quizzesAvailable = require('../../assets/quizzes')

router.get('/', (req, res) => {

    const topic = req.query.topic
    const questionData = quizzes[topic]

    if (!questionData) {
        return res.status(404).json({
            error: 'No such quiz found!'
        })
    }

    res.status(200).json({
        error: null,
        questions: questionData
    })
})

router.post('/assign', async (req, res) => {

    const { parentEmail, childEmail, quizTopic } = req.body

    if (!(await findParentByEmail(parentEmail))) {
        return res.status(401).json({
            error: "Please register as Parent before assigning the quiz"
        })
    }

    if (!(await findChildByEmail(childEmail))) {
        return res.status(401).json({
            error: "Looks like your child has not made an account yet!"
        })
    }

    if (!quizTopic) {
        return res.status(401).json({
            error: "No quiz was passed in the body"
        })
    }

    if (!quizzesAvailable[quizTopic]) {
        return res.status(404).json({
            error: "No such quiz found!"
        })
    }

    const parent = await Parent.findOne({ email: parentEmail })
    let assignedQuizzesParent = await parent.assignedQuizzes

    for (let i = 0; i < assignedLessonsParent.length; i++) {
        if (assignedQuizzesParent[i]['lessonTopic'] == quizTopic && assignedQuizzesParent[i]['completed'] == false && assignedQuizzesParent[i]['email'] == childEmail) {
            return res.json({
                error: "Quiz has been already assigned, let your child finish it before re-assigning it."
            })
        }
    }

    const child = await Child.findOne({ email: childEmail })
    let assignedQuizzesChild = child.assignedQuizzes

    const updateRefParent = {
        name: child.name,
        email: child.email,
        quizTopic,
        completed: false
    }
    assignedQuizzesParent.push(updateRefParent)

    const updateRefChild = {
        quizTopic,
        completed: false
    }
    assignedQuizzesChild.push(updateRefChild)

    try {

        await Parent.findOneAndUpdate({ email: parentEmail }, { assignedQuizzes: assignedQuizzesParent })
        await Child.findOneAndUpdate({ email: childEmail }, { assignedQuizzes: assignedQuizzesChild })
        return res.status(201).json({
            error: null,
        })

    } catch (error) {

        return res.json(500).json({
            error: "Server Error!"
        })

    }
})

router.post('/complete', async (req, res) => {

    const { childEmail, parentEmail, quizTopic, quizScore } = req.body

    if (!(await findParentByEmail(parentEmail))) {
        return res.status(401).json({
            error: "Please register as Parent"
        })
    }

    if (!(await findChildByEmail(childEmail))) {
        return res.status(401).json({
            error: "Invalid child email!"
        })
    }

    if (!quizTopic) {
        return res.status(401).json({
            error: "No quiz was passed in the body"
        })
    }

    if (!quizScore) {
        return res.status(401).json({
            error: "No quiz score was passed in the body"
        })
    }

    const child = await Child.findOne({ email: childEmail })
    const childHistory = child.quizHistory
    const newHistory = {
        score: quizScore,
        topic: quizTopic
    }
    childHistory.push(newHistory)

    const parent = await Parent.findOne({ email: parentEmail })
    const parentHistory = parent.quizHistory
    const newHistoryParent = {
        score: quizScore,
        topic: quizTopic,
        name: child.name,
        email: childEmail
    }
    parentHistory.push(newHistoryParent)

    try {
        await Parent.findOneAndUpdate({ email: parentEmail }, { quizHistory: parentHistory })
        await Child.findOneAndUpdate({ email: childEmail }, { quizHistory: childHistory })

        return res.status(201).json({
            error: null
        })

    } catch (error) {
        return res.status(500).json({
            error: "Server unresponsive!"
        })
    }

})

module.exports = router