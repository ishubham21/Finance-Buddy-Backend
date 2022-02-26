const router = require('express').Router()
const Parent = require('../../models/Parent')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { findParentByEmail } = require('../../controllers/parentValidators')
const { verifyLogin, verifyRegistration } = require('../../controllers/commonValidators')

router.post('/register', (req, res) => {
    //verifying if the registration data is according to the specifications
    const verificationError = verifyRegistration(req.body).error

    //send a status of 400 in case of wrong details
    if (verificationError) {
        return res.status(406).json({
            error: verificationError.details[0].message
        })
    }

    //checking if the email entered by the parent is already present
    if (await findParentByEmail(req.body.email)) {
        return res.status(403).json({
            error: "Email already exists"
        })
    }

    //hasing the password submitted by parent using bcrypt
    const salt = await bcrypt.genSalt(10)   //generating a random string
    const password = await bcrypt.hash(req.body.password, salt)

    //destructuring the parent from the request
    const parent = new Parent({
        name: req.body.name,
        email: req.body.email,
        password
    })

    //trying to save the parent data in MongoDB Atlas
    try {

        const savedParent = await parent.save()
        res.status(201).json({
            id: savedParent._id
        })

    } catch (err) {
        res.status(503).json({
            error: err
        })
    }
})

router.post('/login', (req, res) => {

    //checking for verification errors
    const verificationError = verifyLogin(req.body).error
    if (verificationError) {
        return res.status(406).json({
            error: verificationError.details[0].message
        })
    }

    //checking if the email entered by the user is already present
    if (!(await emailValidation(req.body.email))) {
        return res.status(403).json({
            error: "Email doesn't exist"
        })
    }

    const parent = await Parent.findOne({ email: req.body.email });

    // checking for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(401).json({
            error: "Incorrect Password"
        });
    }

    // create token by encypting the data
    //jwt contains - header + data + encryption info
    const token = jwt.sign(
        // payload data
        {
            name: parent.name,
            email: parent.email,
            children: parent.children,
            sentRequests: parent.sentRequests,
            id: parent._id,
        },
        process.env.TOKEN_SECRET
    );

    //sending token as a header upon successful login
    res.header("auth-token", token).json({
        data: {
            token
        },
    });
})

module.exports = router