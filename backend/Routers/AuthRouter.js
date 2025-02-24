const { signup, login } = require('../Controllers/AuthController')
const { SignupValidation, LoginValidation } = require('../Middlewares/AuthValidation')

const router = require('express').Router()

// router.post('/login',(req,res)=>{
//     res.send('login success')
// })
// FOR DEBUGGING
// console.log('signup:', signup);
// console.log('SignupValidation:', SignupValidation);
router.post('/signup',SignupValidation,signup)
router.post('/login',LoginValidation,login)

module.exports = router