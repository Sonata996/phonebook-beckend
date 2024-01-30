const  {isValidObjectId} = require('mongoose');

const isValid = (req, res, next)=>{
    const {contactId} = req.params;
    if(!isValidObjectId(contactId)){
        res.status(400).json({
            message: "id not valid"
        })
        return;
    }
    next();
}

module.exports = isValid;