const express = require('express')
const User = require('../models/User');
const router = express.Router();
const {body, validationResult } = require('express-validator')

//create a user using: POST "/api/auth"
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','password must be atleast 5 character').isLength({min:6})
], async(req, res)=>{
    
    //if there are errors, return Bad request and the erors
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    //check whether the user with this email exists already
  try { 
     let user =  await User.findOne({email:req.body.emil});
    if(user){
        return res.status(400).json({error:"sorry a user with this email already exists"})
    }

    //create a new user
    user = await User.create({
        name : req.body.name,
        password : req.body.password,
        email : req.body.email,
    })
    
    res.json(user)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router