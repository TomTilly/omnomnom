const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const Recipe = require('./models/recipe');
const Comment = require('./models/comment');
const User = require('./models/user');
const seedDB = require('./seed');
require('dotenv').config({ path: 'variables.env' });
const PORT = process.env.PORT;

// Requiring routes
const indexRoutes = require('./routes/index');
const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});

// Passport Config
app.use(require('express-session')({
	secret: 'Plaid shirts from outer space',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Add middleware to make variables available to all templates
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// Routes 

app.use('/recipes', recipeRoutes);
app.use('/recipes/:id/comments', commentRoutes);
app.use('/', indexRoutes);


app.listen(PORT, function(){
	console.log("Server started: ", new Date());
});