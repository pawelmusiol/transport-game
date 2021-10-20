const mongoose = require('mongoose')
const chunkSchema = require('./chunk')
const mapSchema = new mongoose.Schema({
	chunks:[[chunkSchema.chunkSchema]]
})



module.exports = mongoose.models.Map || mongoose.model('Map', mapSchema)