const db = require('../utils/db')
const buildingSchema = require('../schemas/building')

db.connect()
exports.getBuilding = async () => {
    return await buildingSchema.find({})
}

exports.updateBuilding = async (id, data) => {
    return await buildingSchema.update({ _id: id }, {
        $set: data
    })
}

exports.getBuildingInPosition = async (position) => {
    return await buildingSchema.find({
        "position.province.x": position.province.x,
        "position.province.y": position.province.y,
        "position.tile.x": position.tile.x,
        "position.tile.y": position.tile.y
    })
}

exports.getBuildingsInRange = async (min, max) => {
    return await buildingSchema.find({
        "position.province.x": { '$gte': min.x, '$lte': max.x },
        "position.province.y": { '$gte': min.y, '$lte': max.y }
    })
}

exports.getConnections = async (positions) => {
    let east = await this.getBuildingInPosition(positions.east)
    let west = await this.getBuildingInPosition(positions.west)
    let north = await this.getBuildingInPosition(positions.north)
    let south = await this.getBuildingInPosition(positions.south)
    return { east: east, west: west, north: north, south: south }
}

exports.addBuilding = async (building) => {
    return await buildingSchema.insertMany(building)
}

exports.removeBuilding = async (position) => {
    return await buildingSchema.deleteMany({
        "position.province.x": position.province.x,
        "position.province.y": position.province.y,
        "position.tile.x": position.tile.x,
        "position.tile.y": position.tile.y
    })
}