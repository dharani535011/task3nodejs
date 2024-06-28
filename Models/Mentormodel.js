const mongoose=require("mongoose")
const iddType = {
  type: Number,
  validate: {
      validator: function(v) {
          // Add any custom validation logic here if needed
          return Number.isInteger(v) && v > 0; // Example validation: v should be a positive integer
      },
      message: props => `${props.value} is not a valid idd!`
  }
};
const mentorSchema=new mongoose.Schema({
    idd:iddType,
    name:String,
      students: [{
        type: Number,
        ref: 'Student'
      }]
})
const Mentor=mongoose.model("Mentor",mentorSchema,"Mentors")
module.exports=Mentor