const { Promise } = require("mongoose")
const Mentor = require("../Models/Mentormodel")
const Student = require("../Models/Studentmodel")

const Studentcontrol={
    create:async(req,res)=>{
        try {
            const size=await Student.find()
            let idd=size.length+1
            const {name}=req.body
            const student = new Student({name,idd});
            await student.save();
            res.status(201).send(student);
          } catch (e) {
            res.status(400).send(e);
          }
    },
    assignmentor:async (req,res)=>{
        const {mentorid,studentid}=req.params
        try {
            const mentor = await Mentor.findOne({ idd: mentorid });
            const student = await Student.findOne({ idd: studentid });

            if (!mentor || !student) {
                return res.status(404).send({ message: 'Mentor or Student not found' });
            }

            if (student.mentor) {
                return res.status(400).send({ message: 'Student already has a mentor' });
            }

            student.mentor = mentor.idd; 
            mentor.students.push(student.idd); 

            
            await student.save()
            await mentor.save()
            res.status(200).send({ message: 'Student assigned to mentor successfully' });
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    },
    withoutmentor:async(req,res)=>{
        try{
           const student=await Student.find({mentor:null})
           res.send(student)
        }catch(e){
            res.send(e.message)
        }
    },
    assignorchange: async (req, res) => {
        const { mentorid, studentid } = req.params;
        try {
            const mentor = await Mentor.findOne({ idd: mentorid });
            const student = await Student.findOne({ idd: studentid });

            if (!mentor || !student) {
                return res.status(404).send({ message: 'Mentor or Student not found' });
            }

            if (student.mentor && student.mentor !== mentorid) {
                const previousMentor = await Mentor.findOne({ idd: student.mentor });
                if (previousMentor) {
                    previousMentor.students.pull(student.idd);
                    await previousMentor.save();
                }
            }

            student.mentor = mentor.idd;
            if (!mentor.students.includes(student.idd)) {
                mentor.students.push(student.idd);
            }

            await student.save();
            await mentor.save();

            res.status(200).send({ message: 'Mentor assigned or changed successfully' });
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    },
    allstudents:async (req,res)=>{
        const mentorid = req.params.mentorid;
        try {
            const mentor = await Mentor.findOne({ idd: mentorid })
            if (!mentor) {
                return res.status(404).send({ message: 'Mentor not found' });
            }
            res.status(200).send(mentor.students);
        } catch (e) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    },
    previousMentor:async(req,res)=>{
        const studentid = req.params.studentid;
        try {
            const student = await Student.findOne({ idd: studentid })
            if (!student) {
                return res.status(404).send({ message: 'Student not found' });
            }

           
            res.status(200).send(student.previousMentors);
        } catch (e) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }
    

}
module.exports=Studentcontrol