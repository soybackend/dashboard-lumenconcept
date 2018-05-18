var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Capa Speed' });
});

router.get('/batch', function(req, res, next) {
  res.render('batch', { title: 'Capa Batch' });
});

module.exports = router;
