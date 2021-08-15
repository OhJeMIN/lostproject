var express = require('express');
var router = express.Router();
const crypto = require('crypto');
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
  
  //비밀번호 해싱(암호화)
function hash(password) {
    return crypto.createHash('sha512').update(password).digest('hex');
};

function validatePassword (password, pass_hash) {
    // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const hashed = hash(password);
    return pass_hash === hashed;
};

/* GET users listing. */
//async 넣으면 동기 
router.post('/', async function(req, res, next) {
  res.status(201).json('Account');
});

//회원가입
router.post('/signup', async function(req, res, next){
    try{ 
        username= req.body.user_id;
        password = req.body.user_password;      
        confirm_password = req.body.confirm_password;  
        passhash = String(hash(password));       
         if(username.length < 1 ||  password.length < 1 ){
            res.json('iD나 비밀번호에 공백이 있습니다.');
            console.log('Blank');
        }
        if(confirm_password != password){
            res.json('비밀번호 검증이 맞지 않습니다');
            console.log('confirm_password wrong');
        }
        else{
            var idd = [username];
            con.query("select user_id from User where user_id=?", idd , function(err, data){                
                if(data[0].user_id.length == 0){                    
                    con.query("insert into User(user_id, password_hash, login_type) values ('"+username+"','"+passhash+"',"+"1);", function(err, result) {
                    if (err) throw res.json(err);
                    res.json('success');
                    })
                }
                else{
                    res.json('exist ID try another ID');
                    console.log(err);
                }
            })
        }       
    }
    catch(err){
        res.json('err');
        console.log(err);
    }  
});


router.post('/signin', function(req, res, next){    
    res.status(201).json('"messeage" : "success"');
});

router.post('/state', function(req, res, next){
    res.status(201).json('"messeage" : "1"');
});

module.exports = router;