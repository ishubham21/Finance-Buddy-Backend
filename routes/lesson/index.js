const router = require('express').Router()
const lessons = require('../../assets/lessons')

const Parent = require('./../../models/Parent')
const Child = require('./../../models/Child')

const { findChildByEmail } = require('../../controllers/childValidators')
const { findParentByEmail } = require('../../controllers/parentValidators')

const lessonsAvailable = require('../../assets/lessons')

router.get('/', (req, res) => {

    const topic = req.query.topic
    const lessonData = lessons[topic]

    if (!lessonData) {
        return res.status(404).json({
            error: 'No such lesson found!'
        })
    }

    res.status(200).json({
        error: null,
        lesson: lessonData
    })
})

router.post('/assign', async (req, res) => {

    const { parentEmail, childEmail, lessonTopic } = req.body

    if (!(await findParentByEmail(parentEmail))) {
        return res.status(401).json({
            error: "Please register as Parent before assigning the lesson"
        })
    }

    if (!(await findChildByEmail(childEmail))) {
        return res.status(401).json({
            error: "Looks like your child has not made an account yet!"
        })
    }

    if (!lessonTopic) {
        return res.status(401).json({
            error: "No lesson was passed in the body"
        })
    }

    if (!lessonsAvailable[lessonTopic]) {
        return res.status(404).json({
            error: "No such lesson found!"
        })
    }

    const parent = await Parent.findOne({ email: parentEmail })
    let assignedLessonsParent = await parent.assignedLessons

    for (let i = 0; i < assignedLessonsParent.length; i++) {
        if (assignedLessonsParent[i]['lessonTopic'] == lessonTopic && assignedLessonsParent[i]['completed'] == false && assignedLessonsParent[i]['email'] == childEmail) {
            return res.json({
                error: "Lesson has been already assigned, let your child finish it before re-assigning it."
            })
        }
    }

    const child = await Child.findOne({ email: childEmail })
    let assignedLessonsChild = child.assignedLessons

    const updateRefParent = {
        name: child.name,
        email: child.email,
        lessonTopic,
        completed: false
    }
    assignedLessonsParent.push(updateRefParent)

    const updateRefChild = {
        lessonTopic,
        completed: false
    }
    assignedLessonsChild.push(updateRefChild)

    try {

        await Parent.findOneAndUpdate({ email: parentEmail }, { assignedLessons: assignedLessonsParent })
        await Child.findOneAndUpdate({ email: childEmail }, { assignedLessons: assignedLessonsChild })
        
        return res.status(201).json({
            error: null,
        })
    } catch (error) {
        
        return res.json(500).json({
            error: "Server Error!"
        })
    
    }
})

module.exports = router