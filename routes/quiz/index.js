const router = require('express').Router()
const quizzes = require('../../assets/quizzes')

router.get('/', (req, res) => {

    const topic = req.query.topic
    const questionData = quizzes[topic]
    
    if(!questionData){
        return res.status(404).json({
            error: 'No such quiz found!'
        })
    }

    res.status(200).json({
        error: null,
        questions: questionData
    })
})

module.exports = router