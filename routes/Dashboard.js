var express = require('express');
const app = require('../app');
var router = express.Router();
const mysql = require('mysql');

router.use(function(req, res, next){
    next();
});

const con= mysql.createConnection({
    host: '3.143.232.77',
    user:'jasonoh22',
    password: '1234',
    database: 'RAProject'
  });
/* GET home page. */
router.post('/', function(req, res, next) {
    res.status(201).json('Dashboard');
  });

router.post('/checkbox_click', function(req, res, next){
    Token= req.body.Token;
    checkbox = req.body.checkbox;
    ischecked = req.body.isChecked;
    if(checkbox == chaos_dungeon_check01 || checkbox == chaos_dungeon_check02){
        con.query("update Daily set kaos = kaos + 1 where id = 1", function(err, data){
            
        })
    }
    res.status(201).json('"messeage" : "success"');
});

router.post('/datas', function(req, res, next){
    res.status(201).json('"messeage" : "success"');
});
module.exports = router;