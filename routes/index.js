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
  const method = methodsData.findMethod(methodId);
  method
    ? res.send({ success: true, method })
    : res.send({ success: false, reason: "no such id" });
});

router.post("/getUserMethods", async (req, res) => {
  try {
    const list = await methodsData.getUserMethods(req.body);
    res.send({ success: true, list: list });
  } catch (e) {
    res.send({ success: false, reason: e.message });
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
