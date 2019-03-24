const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 7777;
require('dotenv').config({ path: 'variables.env' });

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('home');
});

app.get('/recipes', function(req, res){
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
			directions: 'Mix yeast + sugar in water 7-10min. Mix flour + salt in large bowl. Add water to flour, kneed 10 min. Let sit 2hrs to double in size. Knock it back, kneed for 2 min, let sit 45 min. Bake 450° for 10 min. Reduce to 390° for 40 min.<script>window.alert("HACKED");</script>'
		}
	];

	res.render('recipes', {recipes: recipes});
});

app.listen(port, function(){
	console.log("Server started: ", new Date());
});