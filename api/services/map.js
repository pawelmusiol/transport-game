const mapModel = require('../models/map')

exports.getMap = async () => {
    let map = await mapModel.getMap()
    //changeId(map.chunks[0])
    return map
}

exports.setMap = async () => {
    let chunks = await createChunks(4,3)
    return await mapModel.setMap(chunks)
}

const changeId = async (chunks) => {
    chunks.forEach(chunk =>{
        chunk.tiles.forEach(tileRow =>{
            tileRow.forEach(tile => {
                console.log(tile)
            })
        })
    })
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
        tiles: await createTiles(x,y)
    }
}

const createTiles = async (x,y) => {
    let tiles = []
    for (let i = 0; i < 40; i++) {
        let row = []
        for (let j = 0; j < 40; j++) {
            row.push({
                t:Math.floor(Math.random()*3),
                c:true,
                id:`${i+x*40}.${j+y*40}`
            })
        }
        tiles.push(row)
    }
    return tiles
}