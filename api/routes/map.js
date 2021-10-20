const router = require('express').Router()
const { route } = require('.');
const mapController = require('../controllers/map')

/* GET home page. */
router.get('/', mapController.getMap);
router.post('/create', mapController.setMap)

module.exports = router;
