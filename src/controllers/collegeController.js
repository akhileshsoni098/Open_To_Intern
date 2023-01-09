const collegeModel = require("../models/collegeModel")
const interModel = require("../models/internModel")
/*
edge cases handle krna h ....
{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`},
 logoLink: {mandatory}, isDeleted: {boolean, default: false} }

*/
  // <===============================GLOBAL REGEX====================>

  function validateName(id) {
   let regex = /^[a-zA-Z ]{2,30}$/;
   return regex.test(id);
 }

 


exports.createCollege = async function(req,res){

    const data = req.body
    let {name, fullName, logoLink} = data

    if(Object.keys(data).length==0) return res.status(400).send({status: false,message:"pls provide input"})
if(!name){
     return res.status(400).send({status:false , msg: "name is mandatory" })
    }
    if(!fullName){
        return res.status(400).send({status:false , msg: "fullName is mandatory" })
       }
       if(!logoLink){
        return res.status(400).send({status:false , msg: "logoLink is mandatory" })
       }

      if(!validateName(name)) {return res.status(400).send({status : false, msg : "please provide correct details"})}


         const uniqueName = await collegeModel.findOne({name:data.name})
         if(uniqueName){
    res.status(400).send({status: false , msg: " name is already exist"})
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
