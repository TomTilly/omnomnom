const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');
const Comment = require('./models/comment');
const seedDB = require('./seed');

seedDB();

const port = 7777;
require('dotenv').config({ path: 'variables.env' });


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


// Database setup

mongoose.connect('mongodb://localhost:27017/omnomnom', { useNewUrlParser: true});

app.get('/', function(req, res){
	res.redirect('/recipes');
});

app.get('/recipes', function(req, res){	
	Recipe.find({}, function(err, recipes){
		if(err){
			console.log(err);
		} else {
			res.render('index', {recipes: recipes});
		}
	});
});

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
			res.redirect('/index');		
		}
	});
});

app.get('/recipes/new', function(req, res){
	res.render('new');
});


app.get('/recipes/:id', function(req, res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		if(err){
			console.log(err);
		} else {
			res.render('show', {recipe: foundRecipe});
		}
	});
});

app.get('*', function(req, res){
	res.send('404 - Page Not Found');
});

app.listen(port, function(){
	console.log("Server started: ", new Date());
});