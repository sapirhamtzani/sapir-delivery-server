var express = require("express");
var router = express.Router();
const methodsData = require("../public/javascripts/methodsData");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sapir", (req, res, next) => {
  res.send("Hello from server!!");
});

router.get("/getAllMethods", (req, res, next) => {
  res.send({ list: methodsData.methodsList });
});

router.post("/findMethod", (req, res) => {
  const { methodId } = req.body;
  const method = methodsData.methodsList[methodId];
  method
    ? res.send({ success: true, method })
    : res.send({ success: false, reason: "no such id" });
});

router.post("/getUserMethods", (req, res) => {
  const objUser = {
    address: req.body.address,
    zipcode: req.body.zipcode,
  };
  try {
    const list = methodsData.getUserMethods(objUser);
    res.send({ success: true, list });
  } catch (e) {
    res.send({ success: false, reason: e });
  }
});

router.post("/addMethod", (req, res) => {
  try {
    methodsData.addNewMethod(req.body);
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false, reason: e });
  }
});

module.exports = router;
