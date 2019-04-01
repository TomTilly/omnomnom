const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const Comment = require('./models/comment');

const data = [
	{
		name: 'White Bread',
		ingredients: [
			'3 cups flour',
			'250ml warm water',
			'1 tsp brown sugar',
			'2 tsp yeast',
			'1 tsp salt'
		],
		directions: 'Mix yeast + sugar in water 7-10min. Mix flour + salt in large bowl. Add water to flour, kneed 10 min. Let sit 2hrs to double in size. Knock it back, kneed for 2 min, let sit 45 min. Bake 450° for 10 min. Reduce to 390° for 40 min.<script>window.alert(\"HACKED\");</script>',
		image: 'https://images.unsplash.com/photo-1547033964-e7f1f84b66a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'
	},
	{
		name: 'Rice Pilao',
		ingredients: [ 
			"1 cup uncooked Basmati rice",
			"1&frac13;-1&frac34; cups water",
			"1 tsp salt",
			"Small knob of butter",
			"2 cardamom pods, cracked",
			"2 cloves",
			"1 pinch fennel seeds",
			"2 pinches cumin seeds",
			"1 bay leaf",
			"&frac12; cinnamon stick",
			"1 pinch turmeric or few threads saffron" 
		],
		directions: 'In a medium sauce pan, fry spices (except saffron/turmeric) in butter. Add rice and stir to coat. Add water, salt, turmeric (or saffron), bring to a boil, reducde to low, cover and simmer for 12 min.',
		image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
	},
	{
		name: 'Chinese Fried Rice',
		ingredients: [
			"2 cups cooked rice",
			"1 garlic clove, chopped",
			"&frac12 small onion",
			"1-2 eggs, wisked",
			"&frac12; cup carrots,finely chopped",
			"1/4 cup peas",
			"1 tbsp oystersauce",
			"1 tsp soy sauce",
			"Few drops sesame oil",
			"Chicken (however much you want), chopped"
		],
		directions: 'Prep all ingredients (in bowls). In small bowl, mix sauce w/ fork, cook chicken in oil in a wok, remove. Cook garlic and onion in oil, 2 min. Add peas and carrots, cook 2 min. Push veg. aside, add egg and cook till fluffy, mix in. Cook 2 min. Stir in chicken. Stir in rice. Add sauce and salt. Mix well, cook 2 min. Serves 2.',
		image: 'https://images.unsplash.com/photo-1519624213695-6819a985fb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
	}
]

function seedDB(){
	Recipe.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log('removed recipes from DB');
			data.forEach(function(seed){
				Recipe.create(seed, function(err, recipe){
					if(err){
						console.log(err);
					} else {
						console.log('added a recipe');
						Comment.create(
							{
								text: 'Very tasty!',
								author: 'Harry'
							}, function(err, comment){
								if(err){
									console.log(err);
								} else {
									recipe.comments.push(comment);
									recipe.save();
									console.log('created new comment');
								}
							}
						);
					}
				});
			});
		}
	});

	// add a few comments
}

module.exports = seedDB;