/*
POST /functionup/interns
Create a document for an intern.
Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}
Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like this
Return HTTP status 400 for an invalid request with a response body like this




{ name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, 
collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
POST /functionup/colleges

*/
//const { isValidObjectId } = require("mongoose");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const validator = require("../validator/validator")


exports.createInterns = async function(req,res){
const data = req.body
const {name , email , mobile,collegeName } = data

try {
    if(Object.keys(data).length ==0){
        return res.status(400)>send({status: false , msg: "please provide Input"})
    }
    if(!name){ 
        return res.status(400).send({status: false , msg: "provide your name"})
    }
    if(!email){ 
        return res.status(400).send({status: false , msg: "provide your email"})
    }
    if(!mobile){ 
        return res.status(400).send({status: false , msg: "provide your mobile"})
    }

    if(!collegeName){
        return res.status(400).send({status: false , msg: "please provide collegeName"})
    }

   
    
    if(!validator.validateEmail(email)) {
        return res.status(400).send({status : false, msg : "please provide correct Email"})
    }

    if(!validator.validateInName(name)) {
        return res.status(400).send({status : false, msg : "please provide correct name " })
    }

    if(!validator.validateMobile(mobile)) {
        return res.status(400).send({status : false, msg : "Please use correct Mobile Number"})
    }

    //if(!isValidObjectId(collegeId)) return res.status(400).send({status : false, msg : "CollegeId is not Valid"})
    
    const uniqueEmail = await internModel.findOne({email: data.email})
    
    if(uniqueEmail){
        return res.status(400).send({status: false , msg: "email is already exist"})
    }

    const uniqueMobile = await internModel.findOne({mobile: data.mobile})
    if (uniqueMobile) {
        return res.status(400).send({status:true , msg:"This mobile no is already exist"})

    }
    
    const getCollegeId = await collegeModel.findOne({name : data.collegeName}) 
    console.log(getCollegeId);
    data.collegeId = getCollegeId["_id"]
    
     const saveInterns = await internModel.create(data)
    
    res.status(201).send({status:true,data:saveInterns})

    
    }
 catch (error) {
    return res.status(500).send({status : false , msg : error.message})
}
}
