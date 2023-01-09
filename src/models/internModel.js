const mongooge = require('mongoose')

/*


Intern Model
{ name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, 
collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
*/

const objectId = mongoose.Schema.Types.ObjectId


const collegeSchema = new mongoose.Schema({

name: {
    type:String,
    required:true
},

email:{
    type:String,
    required:true,
    unique:true
},

mobile:{
    type:Number,
    required:true,
    unique:true
},
collegeId:{
type:objectId,
ref:"College_Model"
},

isDeleted:{
type:Boolean,
default:false

}
}, 
{
    timestamp:true
})

module.exports = mongooge.model('Intern_Model' ,collegeSchema )