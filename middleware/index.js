const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const middlewareObj = {};

middlewareObj.checkRecipeOwnership = function(req, res, next){
	// If user is logged in
	if(req.isAuthenticated()){
		Recipe.findById(req.params.id, function(err, foundRecipe){
			if(err || !foundRecipe){
				console.log(err);
				req.flash('error', 'Recipe not found');
				res.redirect('back');
			} else {
				// Does user own the recipe?
				if(foundRecipe.author.id.equals(req.user._id)){
					req.recipe = foundRecipe;
					next();
				} else {
					console.log('You don\'t have permission to do that');
					req.flash('error', 'You don\'t have permission to do that');
					res.redirect('back');
				}
			}
		});
	} else {
		console.log('You need to be logged in to do that');
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	// If user is logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.commentID, function(err, foundComment){
			if(err || !foundComment){
				console.log('Comment not found');
				req.flash('error', 'Comment not found');
				res.redirect('back');
			} else {
				// Did the user author this comment?
				if(foundComment.author.id.equals(req.user._id)) {
					req.comment = foundComment;
					next();
				} else {
					console.log('You don\'t have permission to do that');
					req.flash('error', 'You don\'t have permission to do that');
					res.redirect('back');
				}
			}
		});
	} else {
		console.log('You need to be logged in to do that');
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error', 'Please login first');
	res.redirect('/login');
}

module.exports = middlewareObj;