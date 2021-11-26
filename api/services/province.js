const provinceModel = require('../models/province')
const building = require("./building")

exports.setProvinces = async () => {
    return await createProvinces()
}

exports.getProvince = async (id) => {
    if (checkId) {
        return await provinceModel.getProvince(id)
    }
}

exports.getProvinces = async (id) => {
    if (checkId) {
        let ids = getIds(id)
        let result = await provinceModel.getProvinces(ids)
        let minMax = getMinMax(result.provinces)
        let buildings = await building.getBuildingsInRange(minMax)
        console.log(buildings)
        result.buildings = buildings
        return result
    }
}

const getMinMax = (provinces) => {
    let min = { x: 159, y: 159 }
    let max = { x: 0, y: 0 }

    provinces.forEach(province => {
        if (province.position.x < min.x) {
            min.x = province.position.x
        }
        if (province.position.y < min.y) {
            min.y = province.position.y
        }
        if (province.position.x > max.x) {
            max.x = province.position.x
        }
        if (province.position.y > min.y) {
            max.y = province.position.y
        }
    })
    return { min: min, max: max }

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
