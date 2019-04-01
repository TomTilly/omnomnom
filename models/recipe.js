const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	name: String,
	ingredients: Array,
	directions: String,
	image: String
});

module.exports = mongoose.model('Recipe', recipeSchema);