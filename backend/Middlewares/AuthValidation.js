const Joi = require('joi')

const SignupValidation = (req,res,next)=>{
    const schema = Joi.object({
        name:Joi.string().min(2).max(60).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(20).required()
    })
    
    const {error}=schema.validate(req.body)

    if(error){
        return res.status(400).json({message:'bad request',error})
    }
    next()

}

const LoginValidation = (req,res,next)=>{
    const schema = Joi.object({
        // name:Joi.string().min(2).max(60).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(20).required()
    })
    
    const {error}=schema.validate(req.body)

    if(error){
        return res.status(400).json({message:'bad request',error})
    }
    next()

}

module.exports = {
    SignupValidation, LoginValidation
}