const express=require("express")
const Studentcontrol = require("../controls/Studentcontrol")
const Studentroute=express.Router()

Studentroute.post("/assign/:studentid/:mentorid",Studentcontrol.assignorchange)
Studentroute.post("/create",Studentcontrol.create)
Studentroute.post("/:studentid/:mentorid",Studentcontrol.assignmentor)
Studentroute.get("/withoutmentor",Studentcontrol.withoutmentor)
Studentroute.get("/students/:mentorid",Studentcontrol.allstudents)
Studentroute.get("/previous/:studentid",Studentcontrol.previousMentor)

module.exports=Studentroute