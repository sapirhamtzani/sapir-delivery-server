var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sapir', (req, res, next) => {
  res.send('Hello from server!!');
});

module.exports = router;
