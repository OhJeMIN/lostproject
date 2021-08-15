var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var crypto = require('crypto')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const AccountRouter = require('./routes/Account');
const DashboardRouter = require('./routes/Dashboard');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

require('dotenv').config();
// var decoded_data = jwt.verify(token, 'secret_key');
// console.log(decoded_data.sub)

var authData = {
  username: 'jasonoh2',
  password: '1111'
}

const mysql = require('mysql');
const { response, json } = require('express');

const con= mysql.createConnection({
  host: '3.143.232.77',
  user:'jasonoh22',
  password: '1234',
  database: 'RAProject'
});


var app = express();
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
const router = require('./routes/index');


passport.serializeUser(function(user, done) {
  console.log(3);
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  console.log(4);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

function hash(password) {
  return crypto.createHash('sha512').update(password).digest('hex');
};

function validatePassword (password, pass_hash) {
  // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
  const hashed = hash(password);
  return pass_hash === hashed;
};

//패스포트 로컬전략 설정
passport.use(new LocalStrategy(
  {
  usernameField: "user_id",

  passwordField: "user_password"
  },  
  async function(username, password, done) {
    //사용자가 코드를 작성
    //우리는 mysql 쓰니까 mysql에서 정보를 받아와서 받은 정보하고 일치하는지 확인        
    var sql="select User_id,password_hash from User where User_id=?"
    var id = [username];
    passhash = String(hash(password));
    
    con.query(sql, id, function(err, result){
      if(err){
        return done(null, false, {message: "id not found"});
      }      
      else{
        if(passhash === result[0].password_hash){         
          var token=jwt.sign({
            username: "id",
            password: "password"
          },
          "process.env.SECRET_KEY",
          {
            subject: "LostProject jwtToken",
            expiresIn: '60m',
            issuer: "id"
          });
          result[0]["Token"] = token; // 생성한 토큰을 result에다가 넣어주기
          done(null, result);
        }
        else{
          return done(null, false, {message: "password wrong"});
        }
      }
    })
  }
));

app.use(bodyParser.json());
//로그인 시키는 
// 패스포트 실행 -> 로그인(로컬)
app.post('/Account/signin', async function(req, res, next){
  passport.authenticate('local',(err ,user, info)=>{    
    if(err){
      console.error(err);
    }
    if(!user){
      return res.json(info);
    }
    try{
      var check =jwt.verify(user[0]["Token"], "process.env.SECRET_KEY");
      if(check){
        console.log("success");
        return res.json({user});
      }
    }
    catch(err){
      console.log(err);
      return res.json("token wrong");
    }
  }
)(req,res,next);
});

app.post('/Account/state', function(req, res) {
  if(verifyJsonWebToken(request_token)) {
    doApiJob();
} else {
    res.send('token is invalid')
}
});

app.get('/logout', function(req,res){
  req.logout();
  req.session.save(function(){
    res.redirect('/');
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {  
  con.query('SHOW databases;', function(err, result) {
    if (err) throw err;
    res.send(result);
    });
})// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Account', AccountRouter);
app.use('/Dashboard', DashboardRouter);



app.listen(8000, () => {
    console.log(`Example app listening at http://localhost:8000`)
  })

module.exports = app;
