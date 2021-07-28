var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
    next();
});
/* GET users listing. */
router.post('/', function(req, res, next) {
  res.status(201).json('Account');
});

router.post('/signup', function(req, res, next){
    res.status(201).json('"messeage" : "success"');
});

router.post('/signup', function(req, res, next){
    res.status(201).json('"messeage" : "success"');
});

router.post('/state', function(req, res, next){
    res.status(201).json('"messeage" : "success"');
});

module.exports = router;