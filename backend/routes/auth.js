const express = require('express')
const User = require('../models/User');
const router = express.Router();
const {body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "rahulisgood$"

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
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    //create a new user
    user = await User.create({
        name : req.body.name,
        password : secPass,
        email : req.body.email,
    })

    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)


    res.json({authtoken})

    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


module.exports = router