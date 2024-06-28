const mongoose= require("mongoose");
const iddType = {
    type: Number,
    validate: {
        validator: function(v) {
            return Number.isInteger(v) && v > 0; 
        },
        message: props => `${props.value} is not a valid idd!`
    }
};
const studentSchema=new mongoose.Schema({
    
    idd:iddType,
    name:String,
    mentor: { type: Number, ref: 'Mentor' },
    previousMentors: [{ type: Number, ref: 'Mentor' }],
 
})
const Student=mongoose.model("Student",studentSchema,"Students")
module.exports=Student