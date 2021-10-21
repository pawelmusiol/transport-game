const mongoose = require('mongoose')

const provinceSchema = new mongoose.Schema({
    id: String,
    position: {
        x: Number,
        y: Number,
    },
    tiles: [[
        {
            position: {
                x:Number,
                y:Number,
            },
            t: Number,
            c: Boolean,
        }
    ]]
})

const chunkMapSchema = new mongoose.Schema({
    position: {
        x: Number,
        y: Number
    },
    tiles: [
        [
            {
                t: Number,
                c: Boolean,
                id: String,
            }
        ]
    ]
})

exports.chunkMapSchema = chunkMapSchema

module.exports = mongoose.models.Province || mongoose.model('Province', provinceSchema)