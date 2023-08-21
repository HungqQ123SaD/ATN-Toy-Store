var express = require('express');
const RobotModel = require('../models/RobotModel');
var router = express.Router();

router.get("/", async (req, res) => {
    var robot = await RobotModel.find();
    res.render("toy/robot/index", { robot: robot });
});
router.get("/edit/:id", async (req, res) => {
    var id = req.params.id;
    var robot = await RobotModel.findById(id);
    res.render("toy/robot/edit", { robot: robot });
  });
  
  router.post("/edit/:id", async (req, res) => {
    var id = req.params.id;
    var updatedRobot = req.body;
  
    var originalRobot = await RobotModel.findById(id);
  
    Object.keys(updatedRobot).forEach((key) => {
      if (updatedRobot[key] !== "" && updatedRobot[key] !== undefined) {
        originalRobot[key] = updatedRobot[key];
      }
    });
    await originalRobot.save();
    res.redirect("/toy/robot");
  });

  router.get("/add", (req, res) => {
    res.render("toy/robot/add");
  });
  
  router.post("/add", async (req, res) => {
    var robot = req.body;
    await RobotModel.create(robot);
    res.redirect("/toy/robot");
  });

  router.get("/delete/:id", async (req, res) => {
    var id = req.params.id;
    await RobotModel.findByIdAndDelete(id)
      .then(() => console.log("Delete successfully"))
      .catch((error) => console.log("Delete failed"));
    res.redirect("/toy/robot");
  });
  
  router.get("/deleteall", async (req, res) => {
    await RobotModel.deleteMany()
      .then(() => console.log("Delete successfully"))
      .catch((error) => console.log("Delete failed"));
    res.redirect("/toy/robot");
  });

module.exports = router;