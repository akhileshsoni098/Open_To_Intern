/*
POST /functionup/interns
Create a document for an intern.
Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}
Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like this
Return HTTP status 400 for an invalid request with a response body like this

*/
const internModel = require("../models/internModel")

exports.createInterns = async function(req,res){
const data = req.body
const saveInterns = await internModel.create(data)
res.status(201).send({status:true,data:saveInterns})

}