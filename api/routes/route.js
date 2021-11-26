const router = require('express').Router()
const RouteController = require('../controllers/route')

router.post('/',RouteController.createRoute)
module.exports = router