const express = require('express');
const router = express.Router({mergeParams: true});
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

// New
router.get('/new', isLoggedIn, function(req, res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		res.render('comments/new', {recipe: foundRecipe});
	});
});

// Create
router.post('/', isLoggedIn, function(req, res){
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					recipe.comments.push(comment);
					recipe.save();
					res.redirect(`/recipes/${recipe._id}`);
				}
			});
		}
	});
});

// Edit
router.get('/:commentID/edit', function(req, res){
	Comment.findById(req.params.commentID, function(err, foundComment){
		if(err){
			res.redirect('back');
		} else {
			res.render('comments/edit', { comment: foundComment, recipeID: req.params.id })
		}
	})
});

// Update
router.put('/:commentID', function(req, res){
	Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect('back');
		} else {
			res.redirect(`/recipes/${req.params.id}`);
		}
	});
});

// Delete
router.delete('/:commentID', function(req, res){
	Comment.findByIdAndRemove(req.params.commentID, function(err){
		if(err){
			res.redirect('back');
		} else {
			res.redirect(`/recipes/${req.params.id}`);
		}
	});
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

module.exports = router;