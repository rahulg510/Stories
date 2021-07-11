const router = require("express").Router();

//Landing page

router.get("/", (req,res)=>{
    res.send('Login');
})

router.get("/dashboard", (req,res)=>{
    res.send('Dashboard');
})



module.exports = router;