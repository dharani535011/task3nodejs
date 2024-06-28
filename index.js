const express=require("express")
const mongoose=require("mongoose")
const { MONGODB_URL, PORT } = require("./config")
const Mentorroute = require("./routers/Mentorroutes")
const Studentroute = require("./routers/Studentroutes")

const app=express()



mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("database")
   app.listen(PORT)
})
app.use(express.json());
app.use("/mentor",Mentorroute)
app.use("/student",Studentroute)