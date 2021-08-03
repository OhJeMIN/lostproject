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
    username= req.body.user_id;
    password = req.body.user_password;
    type = req.body.signup_type;    
    res.status(201).json("id:"+username+","+"pw:"+password+","+"type:"+type);  
});

router.post('/signin', function(req, res, next){
    res.status(201).json('"messeage" : "success"');
});

router.post('/state', function(req, res, next){
    res.status(201).json('"messeage" : "1"');
});

module.exports = router;