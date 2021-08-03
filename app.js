var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var AccountRouter = require('./routes/Account');
var DashboardRouter = require('./routes/Dashboard');

var authData = {
  username: 'jasonoh2',
  password: '1111'
}


var app = express();
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('LocalStrategy', username, password);
    if(username === authData.username){
      console.log(1);
      if(password === authData.password){
        console.log(2);
        return done(null, user);
      }else{
        console.log(3);
        return done(null, false, { message: 'Incorrect password.' });
      }
    }else{
      console.log(4);
      return done(null, false, { message: 'Incorrect username.' });
    }   
  }
));

router.post('/Account/signup',
  passport.authenticate('local',   //local은 유저이름, 비번으로 로그인 / local이 아닌것은 facebook or google 등등
));

const mysql = require('mysql');
const { response } = require('express');

const con= mysql.createConnection({
  host: '3.143.232.77',
  user:'jasonoh22',
  password: '1234'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
  });
  
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
