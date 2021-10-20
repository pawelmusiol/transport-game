const map = require('../services/map')

exports.getMap =  async (req, res) => {
    let result = await map.getMap()
    res.send(result)
}

exports.setMap = async (req, res) => {
    let result = await map.setMap()
    res.send(result)
}