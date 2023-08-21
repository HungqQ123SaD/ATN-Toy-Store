var express = require('express');
const RubikModel = require('../models/RubikModel');
var router = express.Router();

router.get("/", async (req, res) => {
    var rubik = await RubikModel.find();
    res.render("toy/rubik/index", { rubik: rubik });
});
router.get("/edit/:id", async (req, res) => {
    var id = req.params.id;
    var rubik = await RubikModel.findById(id);
    res.render("toy/rubik/edit", { rubik: rubik });
  });
  
  router.post("/edit/:id", async (req, res) => {
    var id = req.params.id;
    var updatedRubik = req.body;
  
    var originalRubik = await RubikModel.findById(id);
  
    Object.keys(updatedRubik).forEach((key) => {
      if (updatedRubik[key] !== "" && updatedRubik[key] !== undefined) {
        originalRubik[key] = updatedRubik[key];
      }
    });
    await originalRubik.save();
    res.redirect("/toy/rubik");
  });

  router.get("/add", (req, res) => {
    res.render("toy/rubik/add");
  });
  
  router.post("/add", async (req, res) => {
    var rubik = req.body;
    await RubikModel.create(rubik);
    res.redirect("/toy/rubik");
  });

  router.get("/delete/:id", async (req, res) => {
    var id = req.params.id;
    await RubikModel.findByIdAndDelete(id)
      .then(() => console.log("Delete successfully"))
      .catch((error) => console.log("Delete failed"));
    res.redirect("/toy/rubik");
  });
  
  router.get("/deleteall", async (req, res) => {
    await RubikModel.deleteMany()
      .then(() => console.log("Delete successfully"))
      .catch((error) => console.log("Delete failed"));
    res.redirect("/toy/rubik");
  });

module.exports = router;