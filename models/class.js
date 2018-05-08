var mongoose=require('mongoose');


var Schema = mongoose.Schema;

var schema = new Schema({
  "School_Id" : {type:String},
  "Teacher_Id" : {type:String},
  "Class":{type:String},
  "Subject":{type:String},
  "Timings":{type:String},
  "TeacherType":{type:String}
})

module.exports=mongoose.model('class-details',schema);
