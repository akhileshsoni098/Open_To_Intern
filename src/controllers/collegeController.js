
const collegeModel = require("../models/collegeModel")
const interModel = require("../models/internModel")


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

 
// ==================================post Api college creation=================================================================


  exports.createCollege = async function(req,res){
    res.header('Access-Control-Allow-Origin','*')
 try{
    const data = req.body
    if(Object.keys(data).length==0)
    {
        return res.status(400).send({status: false, data:"pls provide input"})
    }
    let {name, fullName, logoLink} = data
if(!name){
     return res.status(400).send({status:false , data: "name is mandatory" })
    }
    if(!fullName || data.fullName ==""){
        return res.status(400).send({status:false , data: "fullName is mandatory" })
       }
       if(!logoLink){
        return res.status(400).send({status:false , data: "logoLink is mandatory" })
       }
       if(!isValid(name)){
        return res.status(400).send({status:false , data: "please input valid name"})
       }
       if(!isValidName(name)){
        return res.status(400).send({status : false, data : "please provide correct name"})
       }
         const uniqueName = await collegeModel.findOne({name:data.name})
         if(uniqueName){
   return res.status(400).send({status: false , data: " name is already exist"})
         }
    if(!isValidfname(fullName))
    return res.status(400).send({status:false , data:"please enter valid full name"})

    if(!urlreg.test(logoLink)){
  return res.status(400).send({status:false , data: " please enter valid logoLink"})
 }
    const saveCollege = await collegeModel.create(data)
    res.status(201).send({status:true , data:saveCollege})
}
     catch(err) {
        res.status(500).send({ status: false, data: err.message });
    }
  }



// ========================================== get Api fetch data   ==========================================


exports.getCollegeData =async function(req,res){

  res.header('Access-Control-Allow-Origin','*')


 try {

   let collegeName =req.query.collegeName

   if(!collegeName || collegeName.collegeName== "" ){
    return res.status(400).send({status:false , data: "provide college name in query"})
   }
   let getCollegeName= await  collegeModel.findOne({name:collegeName}).select({name:1,fullName:1,logoLink:1})

  //  console.log(getCollegeName);

if(!getCollegeName){
    return res.status(404).send({status: false , data: "no data found"})
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
   return res.status(500).send({status : false, data : error.message})
 }
}
