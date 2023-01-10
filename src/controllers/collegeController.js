
const collegeModel = require("../models/collegeModel")
const interModel = require("../models/internModel")

const validator = require("../validator/validator")

/*
{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`},
 logoLink: {mandatory}, isDeleted: {boolean, default: false} }
*/
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
 
   console.log(getCollegeName);

   let getInternsData = await interModel.find({collegeId:getCollegeName._id}).select({name:1,email:1,mobile:1})
   
   let obj ={}
   obj.name=getCollegeName.name
   obj.fullName = getCollegeName.fullName
   obj.logoLink = getCollegeName.logoLink

   obj.interns = getInternsData

  return  res.status(200).send({status : true , data : obj})
}
  catch (error) {
    res.status(500).send({status : false, msg : error.message})
 }


}

/** */
