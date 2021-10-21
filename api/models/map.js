const mapSchema = require('../schemas/map');
const db = require('../utils/db')

db.connect()
exports.getMap = async  () => {
        let data = await mapSchema.find({})
        return data[0]
}

exports.setMap = async (chunks) => {
    await mapSchema.insertMany({
        chunks:chunks
    })
}