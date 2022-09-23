const express = require('express')
const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination:function(req,res,cb){
        var k = fs.existsSync('C:/Users/ELCOT/Desktop/CODE/int/my-app/Job Posting website/Nodejs/Uploads')
        console.log(k)
        if(!k)
        fs.mkdir('C:/Users/ELCOT/Desktop/CODE/int/my-app/Job Posting website/Nodejs/Uploads',function(err,path){
            if(err){
                console.log(err)
            }else{
                console.log(path);
            }
        })
        // cb(null,'C:/Users/ELCOT/Desktop/CODE/int/my-app/Job Posting website/Nodejs/Uploads')

        cb(null,'C:/Users/ELCOT/Desktop/CODE/int/my-app/Job Posting website/Nodejs/Uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now().toString()+file.originalname)
    },
})
const fileFilters = function(req,file,cb){
    if(file.mimetype == 'image/jpeg'||file.mimetype=='image/jpg'||file.mimetype=='image/png'){
        console.log(28,file);
        cb(null,true)
    }else{
        cb(null,false)
    }
}
const upload = multer({storage:storage,fileFilter:fileFilters})
module.exports={upload}