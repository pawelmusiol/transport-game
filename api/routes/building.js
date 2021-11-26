const router = require('express').Router()
const buildingController = require('../controllers/building')

router.post('/', buildingController.addBuilding);
router.delete('/:provinceX.:provinceY.:tileX.:tileY', buildingController.removeBuilding);

module.exports = router