const router = require('express').Router()
const lessons = require('../../assets/lessons')

router.get('/', (req, res) => {

    const topic = req.query.topic
    const lessonData = lessons[topic]
    
    if(!lessonData){
        return res.status(404).json({
            error: 'No such lesson found!'
        })
    }

    res.status(200).json({
        error: null,
        lesson: lessonData
    })
})

module.exports = router