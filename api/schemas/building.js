const mongoose = require('mongoose')


//t: type
//c: crossable For
const BuildingSchema = new mongoose.Schema({
    position: {
        province: {
            x: Number,
            y: Number,
        },
        tile: {
            x: Number,
            y: Number,
        },
    },
    t: Number,
    c: {
        train: Boolean,
        car: Boolean,
    },
    connections: {
        east: Boolean,
        west: Boolean,
        south: Boolean,
        north: Boolean,
    },
    connectionCount: Number
})

module.exports = mongoose.models.Building || mongoose.model('Building', BuildingSchema)
