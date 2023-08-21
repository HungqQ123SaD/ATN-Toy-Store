const mongoose = require('mongoose')

var RubikSchema = mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    image: String,
    quantity : Number
})

const RubikModel = mongoose.model("rubik", RubikSchema, "rubik")

module.exports = RubikModel