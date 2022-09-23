const moment = require('moment')
const eventData = require('./module')
const mongoose = require('mongodb')


const createEvent = async (req,res) => {
    try{
        if(req.body){
            req.body.createdAt = moment(new Date()).toString().slice(0,10)
            const data =  await eventData.eventData.create(req.body)
            if(data != null){
                res.status(200).send({success:true,message:"Event created successfully",data:data})
            }else if(data == null){
                res.status(302).send({success:false,message:"Event Not Created"})
            }
        }else{
            res.status(302).send({success:false,message:"Fields are empty"})
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send({success:false,message:err.message})
    }
}

const image = function(req,res){
    try{
        console.log(req.file,27);
        if(req.body != null){
            console.log(27,req.body);
            req.body.image=`../uploads/${req.file.filename}`
            eventData.image.create(req.body,function(err,data){
                if(err){
                    throw err
                }
                else{
                    res.status(200).send({success:true,message:"Image uploaded successfully",data:data})
                }
            })
        }else{
            res.status(400).send({success:false,message:"Image upload failure"})
        }
    }catch(err){
        res.status(400).send({message:err.message})
    }
}

const eventAllData = async(req,res)=>{
    try{
        eventData.eventData.find({deleteFlag:false},function(err,data){
            if(err){
                res.status(400).send({success:false,message:"Data Not Found"})
            }else{
                res.status(200).send({success:true,message:"Event Data",data:data})
            }
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send({success:false,message:err.compare})
    }
}

const eventSingleData = async(req,res)=>{
    try{
        if(req.params.id){
            const id = req.params.id
            eventData.eventData.findById({_id:id,deleteFlag:false},function(err,data){
                if(err){
                    res.status(400).send({success:false,message:err.message})
                }else{
                    res.status(200).send({success:true,message:"Event Data",data:data})
                }
            })
        }else{
            res.status(400).send({success:false,message:"Can't find ID"})
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send({success:false,message:err.message})
    }
}

const editEvent = async (req,res)=>{
    try{
    if(req.params.id){
        const Id = req.params.id
        req.body.eventUpdatedAt = moment(new Date()).toString().slice(0,10)
        eventData.eventData.findByIdAndUpdate({_id:Id,deleteFlag:false},req.body,{new:true},function(err,data){
            if(err){
                throw err
            }else{
                res.status(200).send({success:true,message:"Updated Succesfully",data:data})
            }
        })
    }else{
        res.status(400).send({success:false,message:"Can't find ID"})
    }
    }catch(err){
        console.log(err.message);
        res.status(500).send({success:false,message:err.message})
    }
}

const deleteEvent = async(req,res)=>{
    try{
        if(req.body.items){
            const eventsId = req.body.items
            console.log(107,eventsId);
        // const data = await eventData.eventData.aggregate([{$match:{$and:[{deleteFlag:false},{'_id':{'$in':eventsId}}]}}])
       await eventData.eventData.deleteMany({_id:eventsId})
        res.status(200).send({success:true,message:'Event Deleted'})
    }

    }
    catch(err){
        console.log(err.message);
        res.status(500).send({success:false,message:err.message})
    }
}

// const deleteEvent = async(req,res)=>{
//     try{
//         if(req.body.deleteEvent){
//             const eventsId = req.body.deleteEvent
//             console.log(eventsId);
//         const data = await eventData.eventData.aggregate([{$match:{$and:[{deleteFlag:false},{'_id':{'$in':eventsId}}]}}])
//         // eventData.eventData.findOneAndUpdate({_id:id,deleteFlag:false},{$set:{deleteFlag:true}}
//           if(data){
//                 console.log(data);
            
               
            
//                 if(data.eventId==req.body.eventId){
//                     data.remove()
//                 res.status(200).send({success:true,message:'Event Deleted',data:data})
//                 }
//             }else( res.status(302).send({success:false,message:"Not deleted"}))
//         }else(
//             res.status(400).send({success:false,message:"Can't find delete event"})
//         )
//     }catch(err){
//         console.log(err.message);
//         res.status(500).send({success:false,message:err.message})
//     }
// }
// const deleteEvent = async(req,res)=>{
//     try{
//         if(req.body.deleteEvent){
//             const eventsId = req.body.deleteEvent
//             console.log(eventsId);
//         // const data = await eventData.eventData.aggregate([{$match:{$and:[{deleteFlag:false},{'_id':{'$in':eventsId}}]}}])
//        for(let i=0;i<=eventsId.length;i++){
//         console.log(eventsId.length)
//             // deletefn(eventsId[i])
//             eventData.eventData.findOneAndUpdate({_id:eventsId[i],deleteFlag:false},{$set:{deleteFlag:true}})
//         } 
//        function deletefn(Id){
        
//         }
//         res.status(200).send({success:true,message:'Event Deleted'})
//     }
//         //   if(data){
//         //         console.log(data);
//                 // if(data.eventId==req.body.eventId){
//                     // data.remove()
               
//                 // }
//             // }else( res.status(302).send({success:false,message:"Not deleted"}))
//         // }else(
//         //     res.status(400).send({success:false,message:"Can't find delete event"})
//         // )
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).send({success:false,message:err.message})
//     }
// }

module.exports = {createEvent,image,editEvent,deleteEvent,eventSingleData,eventAllData}