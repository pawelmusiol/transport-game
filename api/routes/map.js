const router = require('express').Router()
const { route } = require('.');
const mapController = require('../controllers/map')
const provinceController = require('../controllers/province')

/* GET home page. */
router.get('/', mapController.getMap);
//router.post('/create', mapController.setMap)
//router.post('/province/create', provinceController.setProvinces)
router.get('/province/:provinceId', provinceController.getProvince)
router.get('/provinces/:provinceId', provinceController.getProvinces)

module.exports = router;
