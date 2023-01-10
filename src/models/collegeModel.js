

const mongoose = require('mongoose')

/*
College Model
{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, 
logoLink: {mandatory}, isDeleted: {boolean, default: false} }

*/

//========================================== post clg Api =====================================================

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
<<<<<<< HEAD
},{timestamps : true})
=======
}, {timestaps:true})
>>>>>>> a063796a06c1a9287c7ef8f88cd31c794a12bf44

module.exports = mongoose.model('college' , collegeSchema)
