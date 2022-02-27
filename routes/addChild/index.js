const router = require('express').Router()

const Parent = require('./../../models/Parent')
const Child = require('./../../models/Child')

const { findChildByEmail } = require('../../controllers/childValidators')
const { findParentByEmail } = require('../../controllers/parentValidators')

router.post('/', async (req, res) => {

    const { parentEmail, childEmail } = req.body

    if (!(await findParentByEmail(parentEmail))) {
        return res.status(401).json({
            error: "Please register as Parent before adding a child"
        })
    }

    if (!(await findChildByEmail(childEmail))) {
        return res.status(401).json({
            error: "Looks like your child has not made an account yet!"
        })
    }

    const parent = await Parent.findOne({ email: parentEmail })
    let childrenFromParent = parent.children

    // childrenFromParent.every(child => {
    //     if(child['email'] == childEmail){
    //         return res.status(403).json({
    //             error: `You already have ${child['name']} added as your child`
    //         })
    //     }
    // })

    for (let i = 0; i < childrenFromParent.length; i++) {
        if (childrenFromParent[i]['email'] == childEmail) {
            return res.status(403).json({
                error: `You already have ${childrenFromParent[i]['name']} added as your child`
            })
        }
    }

    const child = await Child.findOne({ email: childEmail })
    const parentFromChild = child.parent

    childrenFromParent.push({
        name: child.name,
        email: childEmail
    })

    parentFromChild.push({
        name: parent.name,
        email: parentEmail
    })

    console.log(parentFromChild);
    try {

        await Parent.findOneAndUpdate({ email: parentEmail }, { children: childrenFromParent })
        await Child.findOneAndUpdate({ email: childEmail }, { parent: parentFromChild })

        return res.status(201).json({
            error: null
        })

    } catch (error) {
        return res.status(500).json({
            error: "Server Broke :("
        })
    }

})

module.exports = router