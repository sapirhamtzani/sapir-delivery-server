var express = require('express');
var router = express.Router();
const methodsData = require('../Public/javascripts/methodsData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sapir', (req, res, next) => {
  res.send('Hello from server!!');
});

router.post('/getMethods',(req, res) => {
  let address=req.body.address;
  let zipcode=req.body.zipcode;
  res.send({success: true, list: `${address} + ${zipcode}`})
});

router.post('/addMethod',(req, res) => {
  try {
    methodsData.addNewMethod(req.body);
    res.send({success: true})
  }catch (e) {
    res.send({success: false, reason: e})
  }

});

module.exports = router;
