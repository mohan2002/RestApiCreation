require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//Mongo Db Connection
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log("Db connected"))


//Middlewares and routes:
app.use(express.json())

const ProfilessRouter = require('./routes/Profiles')

app.use('/profiles',ProfilessRouter)


const PORT = 5000 || process.env.PORT
app.listen(PORT,() => {
    console.log("Server started");
})