const collegeModel = require('../models/collegeModel')

/*
edge cases handle krna h ....
{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`},
 logoLink: {mandatory}, isDeleted: {boolean, default: false} }

*/


exports.createCollege = async function(req,res){

    const data = req.body

    const saveCollege = await collegeModel.create(data)
    res.status(201).send({status:true , msg:saveCollege})

}



