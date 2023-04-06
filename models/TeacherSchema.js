const mongoose= require('mongoose')
const validate =require("validator")
const teacherSchema = new mongoose.Schema({
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
    phone:{
        type:Number,
        required:[true,"please enter your phone"],
        milength:[8,"phone number cannot less than 11 character"],
        

    },

    image:{
        type:"string"

    }
    
   

}) 
module.exports =  mongoose.model("teacher",teacherSchema)
