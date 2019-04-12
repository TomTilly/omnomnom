const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/user');
const passport = require('passport');

// Home (root)
router.get('/', function(req, res){
	res.redirect('/recipes');
});

// ============
// Auth Routes
// ============

// Show Sign Up Form
router.get('/register', function(req, res){
	res.render('register');
});

// Handles sign up logic
router.post('/register', function(req, res){
	const newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/recipes');
		});
	});
});

// Show Login form
router.get('/login', function(req, res){
	res.render('login');
});

// Handles login form logic
router.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/recipes',
		failureRedirect: '/login'
	}), function(req, res){
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'Logged out');
	res.redirect('/recipes');
});

// 404
router.get('*', function(req, res){
	res.send('404 - Page Not Found');
});

module.exports = router;