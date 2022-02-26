const Parent = require('../models/Parent')
const ObjectId = require('mongoose').Types.ObjectId

const findParentByEmail = async () => {
    const parent = await Parent.findOne({ email: email })   //findOne returns an entire obejct where email === email
    return parent !== null  //return true if email exists
}

//verifying that the user with the given id exist on the database
const findParentById = async (parentId) => {
    //making use of a try and catch to handle all the errors that might popup
    try {
        const parent = await Parent.findOne({ _id: new ObjectId(parentId) })  //using ObjectId imported from mongoose - using this to perform type matching since _id is not a simple string but an object   //it must be a 12character string
        return parent !== null
    }
    catch (error) {
        if (error) {
            return false
        }
    }
}

module.exports = {
    findParentByEmail,
    findParentById
}