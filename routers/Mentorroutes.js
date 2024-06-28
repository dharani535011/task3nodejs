const express=require("express")
const Mentorcontrol = require("../controls/Mentorcontrol")
const Mentorroute=express.Router()

Mentorroute.post("/create",Mentorcontrol.create)
module.exports=Mentorroute