const express = require('express') 
const bodyParser = require('body-parser')
const route = require('./routes/route')

const mongoose = require('mongoose')

const app = express();
const multer = require('multer')
mongoose.set('strictQuery', false);

app.use(bodyParser.json())
app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}))

app.use(multer().any())


mongoose.connect("mongodb+srv://Amityadav:Amit160419@cluster0.glxnckl.mongodb.net/group18Database",{useNewUrlParser:true})

.then(()=> console.log("DB is Connected"))

.catch(err => console.log(err))

app.use('/',route);

app.listen( 3001,function () {

    console.log("Express app running on port"+3001)
})