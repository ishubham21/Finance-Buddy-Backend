const Child = require('../models/Child')
const ObjectId = require('mongoose').Types.ObjectId

const findChildByEmail = async (email) => {
    const child = await Child.findOne({ email: email })   //findOne returns an entire obejct where email === email
    return child !== null  //return true if email exists
}

//verifying that the user with the given id exist on the database
const findChildById = async (childId) => {
    //making use of a try and catch to handle all the errors that might popup
    try {
        const child = await Child.findOne({ _id: new ObjectId(childId) })  //using ObjectId imported from mongoose - using this to perform type matching since _id is not a simple string but an object   //it must be a 12character string
        return child !== null
    }
    catch (error) {
        if (error) {
            return false
        }
    }
}

module.exports = {
    findChildByEmail,
    findChildById
}