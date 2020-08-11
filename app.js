if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
};

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

//DB config

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const db = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

//Connect to Mongo

mongoose.connect(db, { useUnifiedTopology: true, 
    useNewUrlParser: true }).then(() => 
    console.log('MongoDB connected...')).catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  //Passport middleware
app.use(passport.initialize());
app.use(passport.session());

  //Connect flash
  app.use(flash());

  //Global vars
  app.use((req, res, next) => {
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      next();
  });

//Routes
app.use(express.static(__dirname + '/public'));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));