const mongoose = require('mongoose')

const RouteSchema = new mongoose.Schema({
    id: String,
    start: {
        position: {
            x:Number,
            y:Number,
        },
        t: Number,
        c: Boolean,
    },
    end: {
        position: {
            x:Number,
            y:Number,
        },
        t: Number,
        c: Boolean,
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

exports.chunkMapSchema = chunkMapSchema

module.exports = mongoose.models.Province || mongoose.model('Province', provinceSchema)