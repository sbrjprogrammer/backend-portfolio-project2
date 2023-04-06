const express= require("express")
const user =require("../models/userSchema")
const jwt = require("jsonwebtoken")


exports.getusers = async(req,res)=>{
    try {
        let users = await user.find()
        
        res.status(200).json({
            message:"All user here",
            users
        })
    } catch (error) {
        console.log(error.message)
    }

}

exports.registerUser = async(req,res)=>{
try {
    const userExists = await user.findOne({ email: req.body.email });
    if(userExists){
        return res.status(500).json({
            success:false,
            user:"Already register"
        })
    }

    
    let users = await user.create(req.body);
  

    let tokenResponse =async()=>{

      return  jwt.sign({id:1234},"secret",{
        expiresIn:"1h"
      })
    
 }

 let token = await tokenResponse()


console.log(token)
console.log(user.id)
    res.status(200).json({
        message:'user register',
        users,
        token
        
    })
} 
catch (error) {
   res.json({
    err:error.message
   }) 
}
}


exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return res.status(500).json({
        message:"plz enter email and password"
      })
    }
  
    const userData = await user.findOne({ email }).select("+password");
  
    if (!userData) {
      return res.status(404).json({
        message:"user not found"
      })
    }
  
    // const isPasswordMatched = await user.comparePassword(password);
    const isPasswordMatched=async function (password) {
      return await bcrypt.compare(password, userData.password);
    };
  
    if (!isPasswordMatched) {
      return res.status(500).json({
        message:"invalid email or password"
      })
    }


    let tokenResponse =async()=>{

      return  jwt.sign({id:1234},"secret",{
        expiresIn:"1h"
      })
    
 }

 let token = await tokenResponse()
  
    res.status(200).json({
      sucess:true,
        message :"login suceessfully",
        token
    })
  };
  