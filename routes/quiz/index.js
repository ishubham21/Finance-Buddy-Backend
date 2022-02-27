const router = require('express').Router()
const quizzes = require('../../assets/quizzes')

const Parent = require('./../../models/Parent')
const Child = require('./../../models/Child')

const { findChildByEmail } = require('../../controllers/childValidators')
const { findParentByEmail } = require('../../controllers/parentValidators')

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

    const parent = await Parent.findOne({ email: parentEmail })
    let assignedQuizzes = parent.assignedQuizzes

    assignedQuizzes.forEach(quiz => {
        if(quiz['quizTopic'] == quizTopic && quiz['completed'] == false)
            res.status(401).json({
                error: "Quiz has been already assigned, let your child finish it before re-assigning it."
            })
    });

    const child = await Child.findOne({email: childEmail})

    const updateRef = {
        name: child.name,
        quizTopic,
        completed: false
    }

    assignedQuizzes.push(updateRef)

    const updatedParent = await Parent.findOneAndUpdate({ email: parentEmail }, { assignedQuizzes })
    res.status(201).json({
        error: null,
        assignedQuizzes: updatedParent.assignedQuizzes
    })
    const parent2 = await Parent.findOne({ email: parentEmail })
    console.log(parent2);
})

module.exports = router