const mongoose = require('mongoose')

/*
Intern Model
{ name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, 
collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
*/

const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({

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
type:ObjectId,
ref:"college"
},

isDeleted:{
type:Boolean,
default:false

}
}, 
{
    timestamps:true
})

module.exports = mongoose.model('intern' ,internSchema )