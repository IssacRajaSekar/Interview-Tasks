const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/JOBPOSTING"
const port = 9000

const user = require('./User/user_routes')
const admin = require('./Admin/admin_routes')
// const job = require('./uploads')

const event = require('./interview_task/routes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/uploads',express.static('C:/Users/ELCOT/Desktop/CODE/int/my-app/Job Posting website/Nodejs/Uploads'))
app.use(cors())

app.use('/jobPostingApp',user,admin,event)

mongoose.connect(url,{dbName:'JOBPOSTING'},()=>{
    console.log("DB Connected")
},()=>{
    console.log('DB Not Connected')
})

app.listen(port,()=>{
    console.log('port is running...',port);
})