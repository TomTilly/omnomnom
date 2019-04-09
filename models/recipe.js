const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	name: String,
	ingredients: Array,
	directions: String,
	image: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	}
});

module.exports = mongoose.model('Recipe', recipeSchema);