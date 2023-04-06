const express = require("express")
const Router = express.Router()
const teacher = require("../models/TeacherSchema")


Router.get('/teacher',async(req,res)=>{
try {
    const teachers = await teacher.find()
    res.status(200).json({
        success:true,
        teachers
    })
} catch (error) {
    res.json({
        message:error.message
    })
}
})

Router.post('/teacher',async(req,res)=>{
    try {
        const teachers = await teacher.create(req.body)
        res.status(200).json({
            success:true,
            teachers
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
    })

module.exports=Router