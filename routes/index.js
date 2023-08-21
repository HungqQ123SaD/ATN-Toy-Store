var express = require('express');
const RobotModel = require('../models/RobotModel');
const RubikModel = require('../models/RubikModel');
var router = express.Router();

router.get("/", async (req, res) => {
    var robot = await RobotModel.find();
    var rubik = await RubikModel.find();
    res.render("index", { robot: robot, rubik: rubik });
  });

  router.get("/detail/:id", async (req, res) => {
    var id = req.params.id;
    var robot = await RobotModel.findById(id);
    var rubik = await RubikModel.findById(id);
    if (robot) {
      res.render("toy/robot/detail", { robot: robot });
    } else if (rubik) {
      res.render("toy/rubik/detail", { rubik: rubik });
    } else {
      res.status(404).send("Product not found");
    }
  });

  router.post("/order", async (req, res) => {
    var data = req.body
    var id = data.id
    var robot = await RobotModel.findById(id);
    var rubik = await RubikModel.findById(id);
    var price = data.price
    var quantity = data.quantity
    var total = price * quantity
  
    if (robot) {
      res.render("toy/robot/order", { robot: robot, quantity:quantity, price:price, total:total});
    } else if (rubik) {
      res.render("toy/rubik/order", { rubik: rubik, quantity:quantity, price:price, total:total});
    } 
  });

  router.post('/search', async (req, res) => {
    var keyword = req.body.keyword;
  
    try {
      var robot = await RobotModel.find({
        $or: [
          { category: new RegExp(keyword, 'i') },
          { name: new RegExp(keyword, 'i') }
        ]
      });
      var rubik = await RubikModel.find({
        $or: [
          { category: new RegExp(keyword, 'i') },
          { name: new RegExp(keyword, 'i') }
        ]
      });
      res.render('index', {  robot: robot, rubik: rubik }); 
    } catch (error) {
      console.error(error);
    }
  });
  
  module.exports = router;
 