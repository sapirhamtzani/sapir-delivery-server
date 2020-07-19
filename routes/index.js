var express = require('express');
var router = express.Router();

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

module.exports = router;
