const router = require('express').Router()
const eventData = require('./controller')
const multer = require('./multer')

router.post('/createevent',eventData.createEvent)
router.post('/image',multer.upload.single('image'),eventData.image)
router.get('/allEvent',eventData.eventAllData)
router.get('/singleEvent/:id',eventData.eventSingleData)
router.put('/editEvent/:id',eventData.editEvent)
router.put('/deleteEvent',eventData.deleteEvent)

module.exports = router