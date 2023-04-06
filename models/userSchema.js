const mongoose= require('mongoose')
const validate =require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"enter you name"],
        maxlength:[30,"name cannot exceed more than 30 character"],
        milength:[4,"name cannot less than 4 character"]
    },
    email:{
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validate.isEmail, "Please Enter a valid Email"],
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        milength:[8,"password cannot less than 4 character"],
        select:false

    },
    
   

}) 




userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next()
  }
  this.password = await bcrypt.hash(this.password,12)


})

userSchema.methods.generateAuthToken= async function(){
 
  return jwt.sign({id:this._id},"secret",{
    expiresIn:"5d"
  })


 
}


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports =  mongoose.model("user",userSchema)
