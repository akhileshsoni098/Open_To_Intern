/*
POST /functionup/interns
Create a document for an intern.
Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}
Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like this
Return HTTP status 400 for an invalid request with a response body like this


Intern Model
{ name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique},
 collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

*/
const { isValidObjectId } = require("mongoose");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")

// <==========================GLOBAL REGEX =====================>

function validateEmail(id) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(id);
  }

  function validateName(id) {
    let regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(id);
  }

  function validateMobile(id) {
    let regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/ ;
    return regex.test(id)
  }

exports.createInterns = async function(req,res){
try {

const data = req.body
const {name , email , mobile, collegeId} = data

if(Object.keys(data).length ==0){

return res.status(400)>send({status: false , msg: "please provide Input"})

}
const {name , email , mobile, collegeName} = data



    if(!name || data.name ==""){ 
        return res.status(400).send({status: false , msg: "provide your name"})
    }
    if(!email){ 
        return res.status(400).send({status: false , msg: "provide your email"})
    }
    if(!mobile){ 
        return res.status(400).send({status: false , msg: "provide your mobile"})
    }

    const uniqueMobile = await internModel.findOne({email: data.mobile})
    if (uniqueMobile) {
        return res.status(400).send({status:true , msg:"This mobile no is already exist"})

    }
    // if(!collegeId){ 
    //     return res.status(400).send({status: false , msg: "provide your collegeId"})
    // }
    // if(!isValidObjectId(collegeId)) {
    //     return res.status(400).send({status : false , msg : "please provide valid collegeId"})
    // }
    
    // regex daalna h
    if(!validateEmail(email)) {
        return res.status(400).send({status : false, msg : "please provide correct Email"})
    }

    if(!validateMobile(mobile)) {
        return res.status(400).send({status : false, msg : "Please use correct Mobile Number"})
    }

    if(!validator.validateInName(name)) {
        return res.status(400).send({status : false, msg : "please provide correct name " })
    }

    
    
    
    const uniqueEmail = await internModel.findOne({email: data.email})
    
    if(uniqueEmail){
        return res.status(400).send({status: false , msg: "email is already exist"})
    }
    
    

    if(!validateMobile(mobile)) {
        return res.status(400).send({status : false, msg : "Please use correct Mobile Number"})
    }
    // const getCollegeId = await collegeModel.fineOne({name : data.collegeName}) 
    // data.collegeId = getCollegeId["_id"]
    
     const saveInterns = await internModel.create(data)
    // saveInterns.isDeleted,
    
    res.status(201).send({status:true,data:saveInterns})
}
    
 catch (error) {
    return res.status(500).send({status : false , msg : error.message})
}
}

/*

## GET /functionup/collegeDetails
Returns the college details for the requested college (Expect a query parameter by the name collegeName. This is anabbreviated college name. For example iith)
Returns the list of all interns who have applied for internship at this college.
The response structure should look like this
Testing
To test these apis create a new collection in Postman named Project 2 Internship
Each api should have a new request in this collection
Each request in the collection should be rightly named. Eg Create college, Get college details etc
Each member of each team should have their tests in running state


*/

const getIntern = async function(req, res){

    const data = req.query

    const showData  = await  internModel.findOne({...data}).populate('collegeId')
res.status(200).send({status:true , data:showData})

}