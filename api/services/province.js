const provinceModel = require('../models/province')

exports.setProvinces = async () => {

    return await createProvinces()
}

exports.getProvince = async (id) => {
    if (checkId) {
        console.log(getIds(id))
        return await provinceModel.getProvince(id)
    }
}

exports.getProvinces = async (id) => {
    if (checkId) {
        let ids = getIds(id)
        return await provinceModel.getProvinces(ids)
    }
}

const getIds = (id) => {
    let results = []
    let [x, y] = id.split('.')
    x = parseInt(x)
    y = parseInt(y)
    for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
            results.push(`${i}.${j}`)
        }
    }
    return results
}


const checkId = (id) => {
    if (!id.includes('.')) {
        return false
    }
    let [x, y] = id.split('.')
    if (parseInt(x) >= 160 || parseInt(x) < 0 || parseInt(y) >= 160 || parseInt(y) < 0) {
        return false
    }
    return true
}

const createProvinces = async () => {
    for (let i = 0; i < 160; i++) {
        for (let j = 0; j < 120; j++) {
            await provinceModel.setProvinces({
                id: `${i}.${j}`,
                position: {
                    x: i,
                    y: j
                },
                tiles: createTiles()
            })
        }

    }
    return results
}

const createTiles = () => {
    let tiles = []
    for (let i = 0; i < 16; i++) {
        let row = []
        for (let j = 0; j < 16; j++) {
            row.push({
                position: {
                    x: i,
                    y: j
                },
                t: 0,
                c: true
            })
        }
        tiles.push(row)
    }
    return tiles
}
