const mongoose = require("mongoose")

const whatsappSchema = new mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
})

module.exports = mongoose.model("messagecontents", whatsappSchema)