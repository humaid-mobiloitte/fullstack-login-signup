const router = require('express').Router()

router.post('/',(req,res)=>{
    res.status(200).json([
        {
            name:'mobile',
            price:20000
        },
        {
            name:'laptop',
            price:60000
        },
        {
            name:'tv',
            price:40000
        },
        {
            name:'headphones',
            price:10000
        }
    ])
})

module.exports = router