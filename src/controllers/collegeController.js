const collegeModel = require("../models/collegeModel")
const interModel = require("../models/internModel")
/*
edge cases handle krna h ....
{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`},
 logoLink: {mandatory}, isDeleted: {boolean, default: false} }

*/
  // <===============================GLOBAL REGEX====================>

  function validateName(name) {
   let regex =  /^[a-z]*$/;
   return regex.test(name);
 }
 function validatefullame(fullName) {

    let regex = /^[a-zA-Z,'.\s]{0,150}$/

    return regex.test(fullName);
  }

  //let urlr = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i

exports.createCollege = async function(req,res){

    const data = req.body

    if(Object.keys(data).length==0)

     return res.status(400).send({status: false,message:"pls provide input"})

    let {name, fullName, logoLink} = data
if(!name){
     return res.status(400).send({status:false , msg: "name is mandatory" })
    }
    if(!validateName(name)) {return res.status(400).send({status : false, msg : "please provide correct details"})}
if(!validatefullame){
}
const uniqueName = await collegeModel.findOne({name:data.name})
         if(uniqueName){
    res.status(400).send({status: false , msg: " name is already exist"})
}
    if(!fullName){
        return res.status(400).send({status:false , msg: "fullName is mandatory" })
       }
if(!validatefullame(fullName)){
    return res.status(400).send({status:false , msg:"please enter valid full name"})
}
       if(!logoLink){
        return res.status(400).send({status:false , msg: "logoLink is mandatory" })
       }
       if(!urlreg.test(logoLink)){
        return res.status(400).send({status:false , msg: " please enter valid logoLink"})
       }

    const saveCollege = await collegeModel.create(data)
    res.status(201).send({status:true , msg:saveCollege})

}



exports.getCollegeData =async function(req,res){
 try {
   let collegeName=req.query.collegeName

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
   return res.status(500).send({status : false, msg : error.message})
 }


}

/**const collegeModel = require("../models/collegeModel")
const interModel = require("../models/internModel")
/*
edge cases handle krna h ....
{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`},
 logoLink: {mandatory}, isDeleted: {boolean, default: false} }

*/
  // <===============================GLOBAL REGEX====================>

  function validateName(name) {
   let regex =  /^[a-z]*$/;
   return regex.test(name);
 }


 
 function validatefullame(fullName) {

    let regex = /^[a-zA-Z,'.\s]{0,150}$/

    return regex.test(fullName);
  }

  let urlreg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i

exports.createCollege = async function(req,res){

    const data = req.body

    if(Object.keys(data).length==0)

     return res.status(400).send({status: false,message:"pls provide input"})

    let {name, fullName, logoLink} = data
if(!name){
     return res.status(400).send({status:false , msg: "name is mandatory" })
    }
    if(!validateName(name)) {return res.status(400).send({status : false, msg : "please provide correct details"})}
if(!validatefullame){
}
const uniqueName = await collegeModel.findOne({name:data.name})
         if(uniqueName){
    res.status(400).send({status: false , msg: " name is already exist"})
}
    if(!fullName){
        return res.status(400).send({status:false , msg: "fullName is mandatory" })
       }
if(!validatefullame(fullName)){
    return res.status(400).send({status:false , msg:"please enter valid full name"})
}
       if(!logoLink){
        return res.status(400).send({status:false , msg: "logoLink is mandatory" })
       }
       if(!urlreg.test(logoLink)){
        return res.status(400).send({status:false , msg: " please enter valid logoLink"})
       }
       
    const saveCollege = await collegeModel.create(data)
    res.status(201).send({status:true , msg:saveCollege})

}







exports.getCollegeData =async function(req,res){

 try {

   let collegeName=req.query.collegeName

   let getCollegeName= await  collegeModel.findOne({name:collegeName}).select({name:1,fullName:1,logoLink:1})
// id aa gyi 
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
   return res.status(500).send({status : false, msg : error.message})
 }


}

/** */
