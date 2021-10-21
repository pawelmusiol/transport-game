const mongoose = require('mongoose');

exports.connect = () => {
    const mongoDB = "mongodb+srv://admin:123321@cluster0.wddka.mongodb.net/Cluster0?retryWrites=true&w=majority"
    return mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
}