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



// const { isValidObjectId } = require("mongoose"); 

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

if(Object.keys(data).length ==0){

return res.status(400)>send({status: false , msg: "please provide Input"})

}
const {name , email , mobile, collegeName } = data



    if(!name || data.name ==""){ 
        return res.status(400).send({status: false , msg: "provide your name"})
    }
    if(!email){ 
        return res.status(400).send({status: false , msg: "provide your email"})
    }
    if(!mobile){ 
        return res.status(400).send({status: false , msg: "provide your mobile"})
    }

    if(!collegeName || data.collegeName ==""){ 
        return res.status(400).send({status: false , msg: "provide your collegeName"})
    }

    const uniqueEmail = await internModel.findOne({email: data.email})
    if(uniqueEmail){
        return res.status(400).send({status: false , msg: "email is already exist"})
    }
 

    const uniqueMobile = await internModel.findOne({mobile: data.mobile})
    if (uniqueMobile) {
        return res.status(400).send({status:true , msg:"This mobile no is already exist"})
    } 
   

    if(!validateEmail(email)) {
        return res.status(400).send({status : false, msg : "please provide correct Email"})
    }

    if(!validateMobile(mobile)) {
        return res.status(400).send({status : false, msg : "Please use correct Mobile Number"})
    }

    if(!validateName(name)) {
        return res.status(400).send({status : false, msg : "please provide correct name " })
    }

    const getcollegeId = await collegeModel.findOne({name:data.collegeName})
    console.log(getcollegeId)

if(!getcollegeId){
    return res.status(400).send({status:fasle ,msg: "clg name is not exist"})
}

if(getcollegeId){

data.collegeId = getcollegeId["_id"]

}
     const saveInterns = await internModel.create(data)
    res.status(201).send({status:true,data:saveInterns})
}
    
 catch (error) {
    return res.status(500).send({status : false , msg : error.message})
}
}

 