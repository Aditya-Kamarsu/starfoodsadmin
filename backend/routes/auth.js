const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Admin = require('../models/Admin');
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "this is my app";
const fetchadmin = require('../middleware/fetchadmin');

//create an admin using: POST "/api/auth/createadmin". Doesn't require login
router.get('/createadmin',
[
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("phonenumber", "Enter your Phone Number").isLength(10),

  ],
    async (req,res)=>{
    //if errors are there, return bad req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //checking whether user with this email exists
    try {
      let user = await Admin.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry the email already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await Admin.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
          passkey: req.body.passkey,
          phonenumber: req.body.phonenumber,
          isAdmin: true,
          isEmailVerified: true
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error occurred");
    }
}
);

//Route 2 Authenticate an admin using: POST "/api/auth/adminlogin", no login required

router.post(
    "/adminlogin",
    [body("email", "Enter a valid email").isEmail(),
      body("password","Password can not be blank").exists()
  ],
    async (req, res) => {
        const success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
          const {email,password} = req.body;
          let user = await Admin.findOne({email});
          if(!user){
            success = false;
              return res.status(400).json({success, error: "Wrong Credentials"});
          }
          const passwordCompare = await bcrypt.compare(password,user.password);
          if(!passwordCompare){
            success = false;  
            return res.status(400).json({success, error: "Wrong Credentials"});
          }
          const data = {
              user:{
                  id:user.id
              }
          }
          const authToken = jwt.sign(data, JWT_SECRET);
          console.log("Logged in");
          success = true;
          res.json({ success, authToken });
      } catch (error) {
          console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
);

//Route 3 Get logged in admin details using post "/api/auth/getadmindetails". Login required
router.post(
    "/getadmindetails", fetchadmin, async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        userId = req.user.id;
        const user = await Admin.findById(userId).select("-password");
        res.send(user);
  
      } catch (error) {
          console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  

module.exports = router;