const express = require('express');
const router = express.Router({mergeParams: true});
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// New
router.get('/new', middleware.isLoggedIn, function(req, res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		if(err || !foundRecipe){
			req.flash('error', `Recipe not found`);
			res.redirect('back');
		}
		res.render('comments/new', {recipe: foundRecipe});
	});
});

// Create
router.post('/', middleware.isLoggedIn, function(req, res){
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
			req.flash('error', `Recipe not found`);
			res.redirect('back');
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash('error', 'Sorry, something went wrong!');
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					recipe.comments.push(comment);
					recipe.save();
					req.flash('success', 'Successfully added comment');
					res.redirect(`/recipes/${recipe._id}`);
				}
			});
		}
	});
});

// Edit
router.get('/:commentID/edit', middleware.checkCommentOwnership, function(req, res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		if(err || !foundRecipe){
			req.flash('error', `Recipe not found`);
			res.redirect('back');
		} else {
			res.render('comments/edit', { comment: req.comment, recipeID: req.params.id })
		}
	});
});

// Update
router.put('/:commentID', middleware.checkCommentOwnership, function(req, res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		if(err || !foundRecipe){
			req.flash('error', `Recipe not found`);
			res.redirect('back');
		} else {
			Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, function(err, updatedComment){
				req.flash('success', 'Successfully updated comment');
				res.redirect(`/recipes/${req.params.id}`);
			});
		}
	});
});

// Delete
router.delete('/:commentID', middleware.checkCommentOwnership, function(req, res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		if(err || !foundRecipe){
			req.flash('error', `Recipe not found`);
			res.redirect('back');
		} else {
			Comment.findByIdAndRemove(req.params.commentID, function(err){
				req.flash('success', 'Comment deleted');
				res.redirect(`/recipes/${req.params.id}`);
			});
		}
	});
});

module.exports = router;