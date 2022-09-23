const mongoose =  require('mongoose')

const eventSchema = mongoose.Schema({
    createdAt:String,
    eventUpdatedAt:String,
    eventName:String,
    location:String,
    startDate:String,
    endDate:String,
    banner:String,
    selected:{
        type:String,
        default:''
    },
    deleteFlag:{
        type:Boolean,
        default:false
    }
},{
    collection:'eventData'
})

const imageSchema = mongoose.Schema({
    image:String,
    deleteFlag:{
        type:String,
        default:false
    }
},{
    collection:'image'
})

const image = mongoose.model('image',imageSchema)
const eventData = mongoose.model('eventData',eventSchema)

module.exports = {eventData,image}