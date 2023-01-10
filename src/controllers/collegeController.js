
const collegeModel = require("../models/collegeModel")
const interModel = require("../models/internModel")

const validator = require("../validator/validator")

/*
{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`},
 logoLink: {mandatory}, isDeleted: {boolean, default: false} }
*/
<<<<<<< HEAD
exports.createCollege = async function(req,res){

try {
  const data = req.body

  if(Object.keys(data).length==0)

   return res.status(400).send({status: false,message:"pls provide input"})

  let {name, fullName, logoLink} = data


if(!name){
   return res.status(400).send({status:false , msg: "name is mandatory" })
  }
  if(!validator.validateName(name)) {return res.status(400).send({status : false, msg : "please provide correct name"})}


const uniqueName = await collegeModel.findOne({name:data.name})

       if(uniqueName){
 return res.status(400).send({status: false , msg: " name is already exist"})
}
  if(!fullName || fullName == ""){
      return res.status(400).send({status:false , msg: "fullName is mandatory" })
     }

     fullName = data.fullName = fullName.trim();
if(!validator.validatefullname(fullName)){
  return res.status(400).send({status:false , msg:"please enter valid full name"})
}


const uniqueFname = await collegeModel.findOne({fullName:data.fullName})

       if(uniqueFname){
 return res.status(400).send({status: false , msg: " Full Name is already exist"})
}

     if(!logoLink){
      return res.status(400).send({status:false , msg: "logoLink is mandatory" })
     }
     if(!validator.validateUrl(logoLink)){
      return res.status(400).send({status:false , msg: " please enter valid logoLink"})
     }
     
  const saveCollege = await collegeModel.create(data)
  res.status(201).send({status:true , msg:saveCollege})



}catch (error) {
 // console.log("Create Blog", error.message);

  res.status(500).send({ status: false, msg: error.message });
}
}
exports.getCollegeData =async function(req,res){

 try {

   let collegeName=req.query.name

   let getCollegeName= await  collegeModel.findOne({name:collegeName}).select({name:1,fullName:1,logoLink:1})
 
=======
  // <===============================GLOBAL REGEX====================>


const isValid = function(value){
    if(typeof value == "undefined"|| value=="null") return false

    if(typeof value == "string" && value.trim().length ==0) return false

    return true
}

const isValidName = function (name) {
    return /^[a-z]*$/
    .test(name)

}
const isValidfname = function (fullName) {
    return /^[a-zA-Z,'.\s]{0,150}$/
    .test(fullName)

}

  let urlreg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i

 
// ==================================post Api =================================================================

  exports.createCollege = async function(req,res){

 try{
    const data = req.body

    if(Object.keys(data).length==0)

        return res.status(400).send({status: false,message:"pls provide input"})
    
    let {name, fullName, logoLink} = data

if(!name){
     return res.status(400).send({status:false , msg: "name is mandatory" })
    }
    if(!fullName){
        return res.status(400).send({status:false , msg: "fullName is mandatory" })
       }
       if(!logoLink){
       
        return res.status(400).send({status:false , msg: "logoLink is mandatory" })

       }
       if(!isValid(name)){
        return res.status(400).send({status:false , msg: "please input valid name"})
       }
       if(!isValidName(name)){
        return res.status(400).send({status : false, msg : "please provide correct name"})
       }

const uniqueName = await collegeModel.findOne({name:data.name})
         if(uniqueName){
    res.status(400).send({status: false , msg: " name is already exist"})
         }

   if(!isValid(fullName)){
return res.status(400).send({status : false, msg : "please provide correct full name"})
   }

if(!isValidfname(fullName))
    return res.status(400).send({status:false , msg:"please enter valid full name"})

    
 if(!urlreg.test(logoLink)){
  return res.status(400).send({status:false , msg: " please enter valid logoLink"})
 }


    const saveCollege = await collegeModel.create(data)
    res.status(201).send({status:true , msg:saveCollege})
    
    } catch(err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
// =================================================================================================================== 
/*

Returns the college details for the requested college (Expect a query parameter by the name collegeName. This is anabbreviated college name. For example iith)
Returns the list of all interns who have applied for internship at this college.
The response structure should look like this
Testing
To test these apis create a new collection in Postman named Project 2 Internship
Each api should have a new request in this collection
Each request in the collection should be rightly named. Eg Create college, Get college details etc
Each member of each team should have their tests in running state

*/



// ========================================== get Api==========================================


exports.getCollegeData =async function(req,res){
 try {

   let collegeName =req.query.collegeName

   if(!collegeName || collegeName.collegeName== "" ){
    return res.status(400).send({status:false , msg: "provide college name in query"})
   }
   let getCollegeName= await  collegeModel.findOne({name:collegeName}).select({name:1,fullName:1,logoLink:1})

>>>>>>> a063796a06c1a9287c7ef8f88cd31c794a12bf44
   console.log(getCollegeName);

if(!getCollegeName){
    return res.status(404).send({status: false , msg: "no data found"})
}
   let getInternsData = await interModel.find({collegeId:getCollegeName._id}).select({name:1,email:1,mobile:1})
   

   let obj ={}
   obj.name=getCollegeName.name
   obj.fullName = getCollegeName.fullName
   obj.logoLink = getCollegeName.logoLink
   obj.interns = getInternsData

  return  res.status(200).send({status : true , data : obj})
}
  catch (error) {
<<<<<<< HEAD
    res.status(500).send({status : false, msg : error.message})
=======
   return res.status(500).send({status : false, msg : error.message})

>>>>>>> a063796a06c1a9287c7ef8f88cd31c794a12bf44
 }
}
