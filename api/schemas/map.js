const mongoose = require('mongoose')
const provinceSchema = require('./province')
const mapSchema = new mongoose.Schema({
	chunks:[[provinceSchema.chunkMapSchema]]
})



module.exports = mongoose.models.Map || mongoose.model('Map', mapSchema)