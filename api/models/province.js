const db = require('../utils/db')
const provinceSchema = require('../schemas/province')

db.connect()
exports.setProvinces = async (provinces) => {
    return await provinceSchema.insertMany(provinces)
}

exports.getProvince = async (id) => {
    return { provinces: await provinceSchema.find({ 'id': id }) }
}
exports.getProvinces = async (ids) => {
    return { provinces: await provinceSchema.find({ 'id': { "$in": ids } }) }
}