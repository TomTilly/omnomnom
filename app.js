const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 7777;
require('dotenv').config({ path: 'variables.env' });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('home');
});

// Put in database eventually
let recipes = [
		{
			name: 'White Bread',
			ingredients: [
				'3 cups flour',
				'250ml warm water',
				'1 tsp brown sugar',
				'2 tsp yeast',
				'1 tsp salt'
			],
			directions: 'Mix yeast + sugar in water 7-10min. Mix flour + salt in large bowl. Add water to flour, kneed 10 min. Let sit 2hrs to double in size. Knock it back, kneed for 2 min, let sit 45 min. Bake 450° for 10 min. Reduce to 390° for 40 min.<script>window.alert("HACKED");</script>',
			image: 'imgs/white-bread.jpg'
		},
		{
			name: 'Rice Pilao',
			ingredients: [
				'1 cup uncooked Basmati rice',
				'1&frac13;-1&frac34; cups water',
				'1 tsp salt',
				'Small knob of butter',
				'2 cardamom pods, cracked',
				'2 cloves',
				'1 pinch fennel seeds',
				'2 pinches cumin seeds',
				'1 bay leaf',
				'&frac12; cinnamon stick',
				'1 pinch turmeric or few threads saffron'
			],
			directions: 'In a medium sauce pan, fry spices (except saffron/turmeric) in butter. Add rice and stir to coat. Add water, salt, turmeric (or saffron), bring to a boil, reducde to low, cover and simmer for 12 min.',
			image: 'imgs/rice-pilaf.jpg'
		},
		{
			name: 'Chinese Fried Rice',
			ingredients: [
				'2 cups cooked rice',
				'1 garlic clove, chopped',
				'&frac12 small onion',
				'1-2 eggs, wisked',
				'&frac12; cup carrots, finely chopped',
				'1/4 cup peas',
				'1 tbsp oystersauce',
				'1 tsp soy sauce',
				'Few drops sesame oil',
				'Chicken (however much you want), chopped'
			],
			directions: 'Prep all ingredients (in bowls). In small bowl, mix sauce w/ fork, cook chicken in oil in a wok, remove. Cook garlic and onion in oil, 2 min. Add peas and carrots, cook 2 min. Push veg. aside, add egg and cook till fluffy, mix in. Cook 2 min. Stir in chicken. Stir in rice. Add sauce and salt. Mix well, cook 2 min. Serves 2.',
			image: 'imgs/chinese-fried-rice.jpg'
		}
	];

app.get('/recipes', function(req, res){	
	res.render('recipes', {recipes: recipes});
});

app.get('/recipes/new', function(req, res){
	res.render('new');
});

app.post('/recipes', function(req, res){
	const name = req.body.name;
	const ingredients = [req.body.ingredients];
	const directions = req.body.directions;
	const newRecipe = {name: name, ingredients: ingredients, directions: directions};
	recipes.push(newRecipe);
	res.redirect('/recipes');
});

app.get('*', function(req, res){
	res.send('404 - Page Not Found');
});

app.listen(port, function(){
	console.log("Server started: ", new Date());
});