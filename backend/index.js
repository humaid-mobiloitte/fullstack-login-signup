const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routers/AuthRouter') 

require('dotenv').config()
require('./Models/db')

const PORT = process.env.PORT || 3000

app.get('/ping',(req,res)=>{
    res.send('pong')
})

app.use(bodyParser.json())
app.use(cors())

//LOGIN AUR SIGNUP KE LIYE ROUTER 
app.use('/auth',AuthRouter)

//PRODUCTS KE LIYE ROUTER....sort of home page
app.use('/products',AuthRouter)

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})