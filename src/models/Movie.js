// src/models/Movie.js
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  rated: Number,
  released: String,
  runtime: String,
  genre: String,
  director: String,
  actors: String,
  plot: String,
  poster: String,
  imdbID: String,
  imdbRating: String,
  imdbLink: String,
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;  // ✅ default export
