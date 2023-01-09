let express = require('express')
let mongoose = require('mongoose')
let app = express()
let routes = require('./routes/route')
app.use(express.json()) //altervative to bodyparser
mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://Amityadav:Amit160419@cluster0.glxnckl.mongodb.net/group18Database')

.then(console.log("MongoDb is connected"))
.catch((e) => console.log(e))

app.use('/',routes)

app.listen(3000,function(){
    console.log("Server is running")
})
