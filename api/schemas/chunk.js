const mongoose = require('mongoose')

const chunkSchema = new mongoose.Schema({
    position:{
        x:Number,
        y:Number
    },
    tiles: [
        [
            {
                t: Number,
                c: Boolean,
            }
        ]
    ]
})

exports.chunkSchema = chunkSchema

module.exports = mongoose.models.Chunk || mongoose.model('Chunk', chunkSchema)