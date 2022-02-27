const router = require('express').Router()

const Parent = require('./../../models/Parent')
const Child = require('./../../models/Child')

const { findChildByEmail } = require('../../controllers/childValidators')
const { findParentByEmail } = require('../../controllers/parentValidators')

router.post('/', (req, res) => {

    const { parentEmail, childEmail } = req.body

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

    const parent = await Parent.findOne({ email: parentEmail })
    let childrenFromParent = parent.children

    const child = await Child.findOne({ email: childEmail })
    const parentFromChild = child.parent

})

module.exports = router