const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');
const port = 7777;
require('dotenv').config({ path: 'variables.env' });


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


// Database setup

mongoose.connect('mongodb://localhost:27017/omnomnom', { useNewUrlParser: true});


// Recipe.create(
// 	{
// 			name: 'Chinese Fried Rice',
// 			ingredients: [
// 				'2 cups cooked rice',
// 				'1 garlic clove, chopped',
// 				'&frac12 small onion',
// 				'1-2 eggs, wisked',
// 				'&frac12; cup carrots, finely chopped',
// 				'1/4 cup peas',
// 				'1 tbsp oystersauce',
// 				'1 tsp soy sauce',
// 				'Few drops sesame oil',
// 				'Chicken (however much you want), chopped'
// 			],
// 			directions: 'Prep all ingredients (in bowls). In small bowl, mix sauce w/ fork, cook chicken in oil in a wok, remove. Cook garlic and onion in oil, 2 min. Add peas and carrots, cook 2 min. Push veg. aside, add egg and cook till fluffy, mix in. Cook 2 min. Stir in chicken. Stir in rice. Add sauce and salt. Mix well, cook 2 min. Serves 2.',
// 			image: 'imgs/chinese-fried-rice.jpg'
// 		}, function(err, recipe){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log('New Recipe: ', recipe);
// 		}
// 	});


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