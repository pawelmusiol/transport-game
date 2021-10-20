const mongoose = require('mongoose');
const mapSchema = require('../schemas/map');

const mongoDB = "mongodb+srv://admin:123321@cluster0.wddka.mongodb.net/Cluster0?retryWrites=true&w=majority"
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

exports.getMap = async  () => {
        let data = await mapSchema.find({})
        return data[0]
}

exports.setMap = async (chunks) => {
    await mapSchema.insertMany({
        chunks:chunks
    })
}