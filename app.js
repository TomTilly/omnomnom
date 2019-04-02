const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');
const Comment = require('./models/comment');
const seedDB = require('./seed');
require('dotenv').config({ path: 'variables.env' });
const port = 7777;


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
seedDB();

// Database setup

mongoose.connect('mongodb://localhost:27017/omnomnom', { useNewUrlParser: true});


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
	Recipe.findById(req.params.id).populate('comments').exec(function(err, foundRecipe){
		if(err){
			console.log(err);
		} else {
			res.render('recipes/show', {recipe: foundRecipe});
		}
	});
});

// ============
// Comments Routes
// ============

// New - Comments
app.get('/recipes/:id/comments/new', function(req, res){
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

// 404
app.get('*', function(req, res){
	res.send('404 - Page Not Found');
});

app.listen(port, function(){
	console.log("Server started: ", new Date());
});