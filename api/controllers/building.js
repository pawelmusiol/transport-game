const building = require('../services/building')

exports.getBuildings = async (req, res) => {
    
}

exports.addBuilding = async (req, res) => {
    let result = await building.addBuilding(req.body.building, req.body.chunkId)
    if (result.code === 201) {
        res.status(result.code).send({buildings: result.buildings});   
    }
    res.status(result.code).send(result.message);
}

exports.removeBuilding = async (req, res) => {
    let result = await building.removeBuilding(req.params, req.query)
    res.status(result.code).send({buildings: result.buildings})
    
}