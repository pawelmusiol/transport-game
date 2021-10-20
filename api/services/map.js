const mapModel = require('../models/map')

exports.getMap = async () => {
    return await mapModel.getMap()
}

exports.setMap = async () => {
    let chunks = await createChunks(4,3)
    return await mapModel.setMap(chunks)
}

const createChunks = async (maxX,maxY) => {
    let chunks = []
    for (let i = 0; i < maxX; i++) {
        for (let j = 0; j < maxY; j++) {
            chunks.push(await createChunk(i,j))
        }     
    }
    return chunks
}

const createChunk = async (x,y) => {
    return {
        position: {
            x:x,
            y:y,
        },
        tiles: await createTiles()
    }
}

const createTiles = async () => {
    let tiles = []
    for (let i = 0; i < 40; i++) {
        let row = []
        for (let j = 0; j < 40; j++) {
            row.push({
                t:Math.floor(Math.random()*3),
                c:true
            })
        }
        tiles.push(row)
    }
    return tiles
}