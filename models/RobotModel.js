const mongoose = require('mongoose')

var RobotSchema = mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    image: String,
    quantity : Number
})

const RobotModel = mongoose.model("robot", RobotSchema, "robot")

module.exports = RobotModel