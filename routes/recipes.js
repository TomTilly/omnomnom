const express = require('express');
const router = express.Router({mergeParams: true});
const Recipe = require('../models/recipe');
const middleware = require('../middleware');


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
router.post('/', middleware.isLoggedIn, function(req, res){
	const name = req.body.name;
	const ingredients = req.body.ingredients.split(/\r?\n/g);
	const directions = req.body.directions;
	const image = req.body.image;
	const author = {
		id: req.user._id,
		username: req.user.username
	}
	const newRecipe = {name: name, ingredients: ingredients, directions: directions, image: image, author: author};

	Recipe.create(newRecipe, function(err, recipe){
		if(err){
			console.log(err);
		} else {
			req.flash('success', 'Recipe successfully created');
			res.redirect('/recipes');		
		}
	});
});

// New
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render('recipes/new');
});

// Show
router.get('/:id', function(req, res){
	Recipe.findById(req.params.id).populate('comments').exec(function(err, mainRecipe){
		if(err || !mainRecipe){
			console.log(err);
			console.log('Recipe Not Found');
			res.redirect('back');
		} else {
			// Find other recipes to display on sidebar of page, making sure ID is not equal to the recipe just found
			Recipe.find({ _id: { $ne: mainRecipe._id }}).limit(2).exec(function(err, otherRecipes){
				if(err){
					console.log(err);
				} else {
					res.render('recipes/show', { recipe: mainRecipe, otherRecipes: otherRecipes });
				}
			});
		}
	});
});

// Edit
router.get('/:id/edit', middleware.checkRecipeOwnership, function(req, res){
	res.render('recipes/edit', {recipe: req.recipe});
});

// Update
router.put('/:id', middleware.checkRecipeOwnership, function(req, res){
	req.body.recipe.ingredients = req.body.recipe.ingredients.split(/\r?\n/g);
	Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedRecipe){
		if(err){
			console.log(err);
			res.redirect('/recipes');
		} else {
			req.flash('success', 'Successfully updated recipe');
			res.redirect(`/recipes/${req.params.id}`);
		}
	});
});

// Delete
router.delete('/:id', middleware.checkRecipeOwnership, function(req, res){
	Recipe.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect('/recipes');
		} else {
			req.flash('success', 'Recipe deleted');
			res.redirect('/recipes');
		}
	});
});

module.exports = router;