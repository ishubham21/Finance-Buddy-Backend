const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    //taking the headers recieved from the GET request
    const token = req.header('auth-token')

    //sending invalid access if no token is encountered
    if (!token) {
        return res.status(401).json({
            error: "Invalid access!"
        })
    }

    //decrypting jwt recieved from the server
    try {
        const verified = jwt.verify(token, 'hackwind')
        req.user = verified    //attaching the user info in the request
        next() //continuing the flow //accessing dashboard route only if the token is verified

    } catch (err) {
        res.status(401).json({
            error: "Not a valid token!"
        })
    }
}

module.exports = verifyToken