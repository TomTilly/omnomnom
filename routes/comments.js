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
router.get('/:comments_id/edit', function(req, res){
	res.send('Edit comments');
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

module.exports = router;