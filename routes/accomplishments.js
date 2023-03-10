const express = require('express')
const router = express.Router()
const accomplishmentsController = require('../controllers/accomplishments') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, accomplishmentsController.getDone)


module.exports = router