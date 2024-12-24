const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "rahulisgood$";


// ROUTE 1: Create a user using: POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        // Check whether a user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "A user with this email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        // Generate auth token
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success  = true
        res.json({success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


//ROUTE 2: Authenticate a user using POST "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        // Compare password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success,error: "Please try to login with correct credentials" });
        }

        // Generate auth token
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success,authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//Route 3: Get loggedin user Details using: POST "/api/auth/getuser". login required
router.post('/getuser',fetchuser, async(req,res) =>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
     console.error(error.messsage);
     res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
