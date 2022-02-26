const Joi = require('@hapi/joi')

//verifying the data inserted by the user
const verifyRegistration = (data) => {
    
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    })

    //returns an object with the error string
    return schema.validate(data)

}

//verifying the login data entered
const verifyLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    })

    return schema.validate(data)
}

module.exports = {
    verifyRegistration,
    verifyLogin
}
