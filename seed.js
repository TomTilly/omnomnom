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
		image: 'https://images.unsplash.com/photo-1547033964-e7f1f84b66a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
		author: {
			id: '5caaa22ca8004a0fc4bf2239',
			username: 'tilly'
		}
	},
	{
		name: 'Rice Pilao',
		ingredients: [ 
			"1 cup uncooked Basmati rice",
			"1 3/4 cups water",
			"1 tsp salt",
			"Small knob of butter",
			"2 cardamom pods, cracked",
			"2 cloves",
			"1 pinch fennel seeds",
			"2 pinches cumin seeds",
			"1 bay leaf",
			"1/2 cinnamon stick",
			"1 pinch turmeric or few threads saffron" 
		],
		directions: 'In a medium sauce pan, fry spices (except saffron/turmeric) in butter. Add rice and stir to coat. Add water, salt, turmeric (or saffron), bring to a boil, reducde to low, cover and simmer for 12 min.',
		image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
		author: {
			id: '5caf8cc542e9e00910814d3a',
			username: 'Potato'
		}
	},
	{
		name: 'Chinese Fried Rice',
		ingredients: [
			"2 cups cooked rice",
			"1 garlic clove, chopped",
			"1/2 small onion",
			"1-2 eggs, wisked",
			"1/2 cup carrots,finely chopped",
			"1/4 cup peas",
			"1 tbsp oystersauce",
			"1 tsp soy sauce",
			"Few drops sesame oil",
			"Chicken (however much you want), chopped"
		],
		directions: 'Prep all ingredients (in bowls). In small bowl, mix sauce w/ fork, cook chicken in oil in a wok, remove. Cook garlic and onion in oil, 2 min. Add peas and carrots, cook 2 min. Push veg. aside, add egg and cook till fluffy, mix in. Cook 2 min. Stir in chicken. Stir in rice. Add sauce and salt. Mix well, cook 2 min. Serves 2.',
		image: 'https://images.unsplash.com/photo-1519624213695-6819a985fb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
		author: {
			id: '5caaa22ca8004a0fc4bf2239',
			username: 'tilly'
		}
	},
	{
		name: 'Chocolate Chip Cookies',
		ingredients: [
			'2 1/2 cups flour',
			'1 tsp baking soda',
			'1 tsp salt',
			'1 cup butter, softened',
			'3/4 cups sugar',
			'3/4 cups brown sugar',
			'1 tsp vanilla',
			'2 eggs',
			'2 cups choclate chips'
		],
		directions: 'Beat all ingredients. Refrigerate dough 1-2 hrs. Drop onto ungreased cookie sheets. 375° 9-11 min. Cool.',
		image: 'https://images.unsplash.com/photo-1553349450-73822a912d0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
		author: {
			id: '5caaa22ca8004a0fc4bf2239',
			username: 'tilly'
		}
	},
	{
		name: 'Mulled Wine',
		ingredients: [
			'1 bottle red wine',
			'1 tsp brown sugar',
			'1 cannamon stick',
			'Grated nutmeg',
			'1 orange, halved',
			'1 dried bay leaf',
			'2 oz sloe gin',
			'4 cloves',
			'1 star anise'
		],
		directions: 'Heat all ingredients gently in a medium sauce pan. Serves 6',
		image: 'https://images.unsplash.com/photo-1542143601-0b3d84693663?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
		author: {
			id: '5caaa22ca8004a0fc4bf2239',
			username: 'tilly'
		}
	},
	{
		name: 'Slow-Cooker Chicken Tikka Masala',
		ingredients: [
			'1-1 1/2 lb. chicken, diced',
			'1 large onion, diced',
			'3 cloves garlic, minced',
			'1-inch piece ginger, peeled, grated',
			'2 Tbsp tomtato paste',
			'1-2 Tbsp garam masala',
			'2 tsp paprika',
			'2 tsp salt',
			'1 can (28oz) diced tomatoes',
			'3/4 cup heavy cream',
			'Fresh cilantro, chopped',
			'2 cups rice, to serve'
		],
		directions: 'Put chicken in slow-cooker with onion, add spices and stir to coat. Mix in tomatoes. Cover and cook 4 hrs high, 8hrs low. Stir in cream 15 min before end. Uncover for thicker sauce. Serves 4-6',
		image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
		author: {
			id: '5caaa22ca8004a0fc4bf2239',
			username: 'tilly'
		}
	}
]

function seedDB(){
	Recipe.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log('removed recipes from DB');
			Comment.deleteMany({}, function(err){
				if(err){
					console.log(err);
				} else {
					console.log('removed comments');
					data.forEach(function(seed){
						Recipe.create(seed, function(err, recipe){
							if(err){
								console.log(err);
							} else {
								console.log('added a recipe');
								Comment.create(
									{
										text: 'Very tasty!',
										author: {
											id: '5caaa22ca8004a0fc4bf2239',
											username: 'tilly'
										}
									},
									{
										text: 'NEEDS MORE SALT!!!',
										author: {
											id: '5caf8cc542e9e00910814d3a',
											username: 'Potato'
										}
									}, function(err, firstComment, secondComment){
										if(err){
											console.log(err);
										} else {
											recipe.comments.push(firstComment);
											recipe.comments.push(secondComment);
											recipe.save();
											console.log('created 2 new comments');
										}
									}
								);
							}
						});
					});
				}
			})
		}
	});
}

module.exports = seedDB;