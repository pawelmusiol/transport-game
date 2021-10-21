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
/*
router.post('/test', (req, res) => {

    let timeStart = new Date
    console.log(timeStart.getTime())
    testFunction()
    let timeStop = new Date
    console.log(timeStop.getTime())
    res.send({ time: timeStop.getTime() - timeStart.getTime() })

})

let testFunction = () => {
    let result = []
    for (let i = 0; i < 10000; i++) {
        let position = { x: 0, y: 0 }
        let x = position.x
        let y = position.y
        result.push()
        
       let position = "1.1"
       let [x,y] = position.split(".")
        //console.log(x,y)
    }
}
*/
module.exports = router;
