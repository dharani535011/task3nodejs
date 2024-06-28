const Mentor = require("../Models/Mentormodel")

const Mentorcontrol={
    create:async (req,res)=>{
       
        try {
            const size= await Mentor.find()
            let idd=size.length+1
            let {name}=req.body
            const mentor = new Mentor({ idd, name });
            const savedMentor = await mentor.save();
            res.status(201).send(savedMentor);
          } catch (error) {
            res.status(500).send({ message: error.message });
          }
    }
}
module.exports=Mentorcontrol