
const express = require("express")
const user = require("./Routers/user")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express();
const bodyParser =require("body-parser")
const teacherRoutes = require('./Routers/teacher')
const cors= require("cors");
const dotenv = require("dotenv")
const port = process.env.PORT|| 5000;

dotenv.config({
    path:"./config.env",
})
const corsOrigin ={
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));
const url = "mongodb+srv://shahzaib:pakistan123@cluster0.7osi3ll.mongodb.net/?retryWrites=true&w=majority"


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json())
app.use("/user",user)
app.use("/",teacherRoutes)

app.get("/",(req,res)=>{
res.send("hello woorld")
})


mongoose.connect(url,{
    useNewUrlParser : true,
    useUnifiedTopology :true
}).then(()=>app.listen(port,()=>{
    
    console.log(`server is running on this ${port}`)
})).catch((err)=>{
    console.log(err.message)
})