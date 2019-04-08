const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Recipe = require('./models/recipe');
const Comment = require('./models/comment');
const User = require('./models/user');
const seedDB = require('./seed');
require('dotenv').config({ path: 'variables.env' });
const port = 7777;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
seedDB();

mongoose.connect('mongodb://localhost:27017/omnomnom', { useNewUrlParser: true});

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


/* Routes */

// Home
app.get('/', function(req, res){
	res.redirect('/recipes');
});

// Index
app.get('/recipes', function(req, res){	
	Recipe.find({}, function(err, recipes){
		if(err){
			console.log(err);
		} else {
			res.render('recipes/index', {recipes: recipes});
		}
	});
});

// Create
app.post('/recipes', function(req, res){
	const name = req.body.name;
	const ingredients = req.body.ingredients.split(/\r?\n/g);
	const directions = req.body.directions;
	const image = req.body.image;
	const newRecipe = {name: name, ingredients: ingredients, directions: directions, image: image};

	Recipe.create(newRecipe, function(err, recipe){
		if(err){
			console.log(err);
		} else {
			console.log(req.body);
			res.redirect('recipes/index');		
		}
	});
});

// New
app.get('/recipes/new', function(req, res){
	res.render('recipes/new');
});

// Show
app.get('/recipes/:id', function(req, res){
	Recipe.findById(req.params.id).populate('comments').exec(function(err, mainRecipe){
		if(err){
			console.log(err);
		} else {
			// Find other recipes to display on sidebar of page, making sure ID is not equal to the recipe just found
			Recipe.find({ _id: { $ne: mainRecipe._id }}).limit(2).exec(function(err, otherRecipes){
				if(err){
					console.log(err);
				} else {
					console.log(otherRecipes);
					res.render('recipes/show', {recipe: mainRecipe, otherRecipes: otherRecipes});
				}
			});
		}
	});
});

// ============
// Comments Routes
// ============

// New - Comments
app.get('/recipes/:id/comments/new', isLoggedIn, function(req, res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		res.render('comments/new', {recipe: foundRecipe});
	});
});

// Create - Comments
app.post('/recipes/:id/comments', function(req, res){
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					recipe.comments.push(comment);
					recipe.save();
					res.redirect(`/recipes/${recipe._id}`);
				}
			});
		}
	});
	
});

// ============
// Auth Routes
// ============

app.get('/register', function(req, res){
	res.render('register');
});

app.post('/register', function(req, res){
	const newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/recipes');
		});
	});
});

app.get('/login', function(req, res){
	res.render('login');
});

app.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/recipes',
		failureRedirect: '/login'
	}), function(req, res){
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/recipes');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

// 404
app.get('*', function(req, res){
	res.send('404 - Page Not Found');
});

app.listen(port, function(){
	console.log("Server started: ", new Date());
});