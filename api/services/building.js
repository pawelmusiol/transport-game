const { connection } = require('mongoose')
const buildingModel = require('../models/building')

exports.getBuildingsInRange = async (range) => {
    const { min, max } = range
    return await buildingModel.getBuildingsInRange(min, max)
}

exports.removeBuilding = async (params, query) => {
    let position = {
        province: {
            x: params.provinceX,
            y: params.provinceY,
        },
        tile: {
            x: params.tileX,
            y: params.tileY
        }
    }

    let result = await buildingModel.removeBuilding(position)
    if (result.deletedCount) {
        await editConnections(position)
        let range = getRange(query.chunkId)
        let buildings = await this.getBuildingsInRange(range)
        return { buildings: buildings, code: 201 }
    }
    else {
        let range = getRange(query.chunkId)
        let buildings = await this.getBuildingsInRange(range)
        return { buildings: buildings, code: 200 }
    }
}

const editConnections = async (position) => {
    let buildings = await buildingModel.getConnections(this.setPositionsGetConnection(position))
    for (const [key, value] of Object.entries(buildings)) {
        if (value.length) {
            let building = value[0]
            
            buildingModel.updateBuilding(building._id, {
                connections: {
                    ...building.connections,
                    ...getDirection(key, true)
                },
                connectionCount: building.connectionCount -= 1
            })
        }
    }
}


exports.setPositionsGetConnection = (position) => {
    let positions = {
        east: {
            province: { ...position.province }, tile: { ...position.tile },
        },
        west: {
            province: { ...position.province }, tile: { ...position.tile },
        },
        north: {
            province: { ...position.province }, tile: { ...position.tile },
        },
        south: {
            province: { ...position.province }, tile: { ...position.tile },
        },
    }

    positions.east.tile.x = parseInt(positions.east.tile.x) - 1
    positions.west.tile.x = parseInt(positions.west.tile.x) + 1
    positions.north.tile.y = parseInt(positions.north.tile.y) - 1
    positions.south.tile.y = parseInt(positions.south.tile.y) + 1
    return checkForProviceRange(positions)
}



const checkForProviceRange = (positions) => {
    let retPositions = {}
    for (const [key, position] of Object.entries(positions)) {
        let retPosition = position
        if (position.tile.x < 0) {
            retPosition.province.x = parseInt(retPosition.province.x) - 1
            retPosition.tile.x = 15
        }
        if (position.tile.x > 15) {
            retPosition.province.x = parseInt(retPosition.province.x) + 1
            retPosition.tile.x = 0
        }
        if (position.tile.y < 0) {
            retPosition.province.y = parseInt(retPosition.province.y) - 1
            retPosition.tile.y = 15
        }
        if (position.tile.y > 15) {
            retPosition.province.y = parseInt(retPosition.province.y) + 1
            retPosition.tile.y = 0
        }
        retPositions[key] = retPosition
    }
    return retPositions
}

const checkForConnections = async (position) => {
    let connections = await buildingModel.getConnections(this.setPositionsGetConnection(position))
    let connectionResult = {}
    let connectionCount = 0
    for (let key in connections) {
        if (connections[key].length) {
            connectionResult[key] = true
            connectionCount++
            await updateConnection(connections[key][0], key)
        }
        else connectionResult[key] = false
    }
    return { connections: connectionResult, connectionCount }

}

const getDirection = (direction, unset = false) => {
    if (unset) {
        if (direction === 'east') return { west: false }
        if (direction === 'south') return { north: false }
        if (direction === 'west') return { east: false }
        if (direction === 'north') return { south: false }
    }
    else {
        if (direction === 'east') return { west: true }
        if (direction === 'south') return { north: true }
        if (direction === 'west') return { east: true }
        if (direction === 'north') return { south: true }
    }

}

const updateConnection = async (building, key, unset = false) => {
    console.log(building)
    let direction = getDirection(key, unset)
    console.log(Object.keys(direction)[0])
    if (building.connections[Object.keys(direction)[0]] !== true) {
        let dupa = await buildingModel.updateBuilding(building._id, {
            connections: {
                ...building.connections,
                ...direction
            },
            connectionCount: building.connectionCount += 1
        })
        console.log(dupa)
    }
}

exports.addBuilding = async (building, chunkId) => {
    let validation = validateBuilding(building)
    if (validation.pass) {
        if ((await buildingModel.getBuildingInPosition(building.position)).length) {
            return { message: `Tile isn't empty`, code: 406 }
        }
        else {
            building = { ...building, ...(await checkForConnections(building.position)) }
            let range = getRange(chunkId)
            await buildingModel.addBuilding(building)
            let buildings = await this.getBuildingsInRange(range)
            return { buildings: buildings, code: 201 }
        }
    }
    else {
        return { message: validation.message, code: 422 }
    }
}

const getRange = (id) => {
    let [x, y] = id.split('.')
    x = parseInt(x)
    y = parseInt(y)

    return {
        min: {
            x: x - 1,
            y: y - 1
        },
        max: {
            x: x + 1,
            y: y + 1
        }
    }
}

const validateBuilding = (building) => {
    try {
        if (building.position.province.x < 0 && building.position.province.x > 15) {
            return { message: 'province error', pass: false }
        }
        if (building.position.tile.x < 0 && building.position.tile.x > 159) {
            return { message: 'tile error', pass: false }
        }
        if (!building.t) {
            return { message: 'type error', pass: false }
        }
        if (typeof building.c.train === 'undefined' && typeof building.c.car === 'undefined') {
            return { message: 'crossable error', pass: false }
        }
        return { message: 'all good', pass: true }
    } catch (err) {
        return { message: 'validation error', pass: false }
    }
}