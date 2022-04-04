const express = require('express')
const userModel = require("./models/userSchema.js");
const app = express()

app.use(express.json())

exports.auth = async(req,res,next) =>{
  const checkUser = req.body;
  console.log("Middleware checkuser--",checkUser.email)
  
  const users = await userModel.find({email: checkUser.email });
  //users.toString() - returns obj instead of array...
  console.log("users-list",users);  

  if (users.length > 0 ) {
    if(checkUser.email === users[0].email) {
      if(checkUser.password === users[0].password) {
        next()
      } else {
        res.status(500).send("--- password invalid!! ----");
      }    
    }
  }
  else {
    res.status(500).send("email invalid!!");
  }

  
}