
const mongoose = require('mongoose')

/*
College Model
{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, 
logoLink: {mandatory}, isDeleted: {boolean, default: false} }


*/



const collegeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true

    },

    fullName:{
         type:String,
        required:true,
        unique:true,
    },
logoLink:{
    type:String
},

isDeleted:{
    type:Boolean,
    default:false
}
})

module.exports = mongoose.model('College_Model' , collegeSchema)