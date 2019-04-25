// grab the things we need
const mongoose = require('mongoose');

const { Schema } = mongoose;

// create a schema
const movieSchema = new Schema({
	name: { type: String, required: true, unique: true },
	summary: String,
	rating: { type: Number, min: 0, max: 5 },
	releaseDate: Date,
	Directors: [],
	created_at: Date,
	updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
const movie = mongoose.model('movie', movieSchema);

// make this available to our movies in our Node applications
module.exports = movie;
