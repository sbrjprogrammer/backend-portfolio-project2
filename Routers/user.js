const express = require("express")
const Router = express.Router()
const {registerUser,getusers,loginUser} = require("../Controllers/UserController")



Router.post('/register',registerUser)
Router.get("/AllUsers", getusers)
Router.post("/login", loginUser)

module.exports = Router