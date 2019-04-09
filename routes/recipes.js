const express = require('express');
const router = express.Router({mergeParams: true});
const Recipe = require('../models/recipe');


// Index
router.get('/', function(req, res){	
	Recipe.find({}, function(err, recipes){
		if(err){
			console.log(err);
		} else {
			res.render('recipes/index', {recipes: recipes});
		}
	});
});

// Create
router.post('/', function(req, res){
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
			res.redirect('/recipes');		
		}
	});
});

// New
router.get('/new', function(req, res){
	res.render('recipes/new');
});

// Show
router.get('/:id', function(req, res){
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

module.exports = router;