var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const methodsData = require("../public/javascripts/methodsData");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sapir", async (req, res, next) => {
  res.send("Hello from server!!");
});

router.get("/check", async (req, res, next) => {
  try {
    let data = await methodsData.getAllMethods();
    res.send({ data });
  } catch (e) {
    res.send({ success: false, reason: e.message });
  }
});

router.get("/getAllMethods", async (req, res, next) => {
  try {
    let methodsList = await methodsData.getAllMethods();
    res.send({ list: methodsList });
  } catch (e) {
    res.send({ success: false, reason: e.message });
  }
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

router.post("/addMethod", async (req, res) => {
  try {
    await methodsData.addNewMethod(req.body);
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false, reason: e.message });
  }
});

module.exports = router;
