const UserModel = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async(req,res)=>{
    try {
        // agr user already exist kr rha hai to usko login kr dega signup krne ki jagh
        const {name,email,password} = req.body
        const user = await UserModel.findOne({email})
        if (user){
            return res.status(409).json({message:'user already exist', success:false})
        }
        const userModel = new UserModel({name,email,password})
        userModel.password = await bcrypt.hash(password,10)
        await userModel.save()
        res.status(201).json({message:'Signup successful', success:true})
    } catch (error) {
        res.status(500).json({message:'Internal server error', success:false})
    }   
}

const login = async(req,res)=>{
    try {
        // user ki entered credentials
        const {email,password}=req.body
        // DB mei checking
        const user = await UserModel.findOne({email})
        // nhi mila user to error message throw krwa diya
        if (!user){
            return res.status(403).json({message:"Login failed due to bad credentials",success:false})
        }
        // mil gya user to password match krne ki koshish
        const isPassEqual = await bcrypt.compare(password,user.password)
        // agr password match nhi hua
        if (!isPassEqual){
            return res.status(403).json({message:"Incorrect password, try again.",success:false})
        }
        // agr password match k gya to JsonWebToken generate kr diya
        const jwtoken = jwt.sign(
            {
                email:user.email,
                _id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'4h'
            }
        )
        res.status(200).json({message:'Login successful',success:true,jwtoken,email,name:user.name})
    } catch (error) {
        res.status(500).json({message:'Internal server error', success:false})
    }
}
module.exports = {
    signup,login
}