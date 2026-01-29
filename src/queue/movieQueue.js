// src/queue/movieQueue.js
import Movie from "../models/Movie.js";
import axios from "axios";

const imdbIds = [
  "tt0111161",
  "tt0068646",
  "tt0468569",
  "tt0071562",
  "tt0050083",
   "tt0167260", //The Lord of the Rings: The Return of the King
  "tt0110912",
  "tt0060196",
  "tt0137523",
  "tt0120737",
  "tt0109830",
  "tt1375666",
  "tt0167261",
  "tt0080684",
  "tt0133093",
  "tt0099685",
  "tt0073486",
  "tt0047478",
  "tt0114369",
  "tt0317248",
  "tt0102926",
  "tt0038650",
  "tt0118799",
  "tt0114814",
  "tt0120815",
  "tt0245429",
  "tt0021749",
  "tt0076759",
  "tt0407887",
  "tt1675434",
  "tt2582802",
  "tt0088763",
  "tt0103064",
  "tt0082971",
  "tt0047396",
  "tt0095765",
  "tt0078788",
  "tt0209144",
  "tt0081505",
  "tt1853728",
  "tt0910970",
  "tt0110413",
  "tt0110357",
  "tt0112573",
  "tt0361748",
  "tt0087843",
  "tt0172495",
  "tt0054215",
  "tt0027977",


];

const insertMovies = async () => {
  console.log("📥 Movie queue started");

  for (const id of imdbIds) {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`
      );

      const movie = response.data;

      // OMDb logical error (still 200 sometimes)
      if (movie.Response === "False") {
        console.error(`❌ OMDb error for ${id}: ${movie.Error}`);
        continue;
      }

      if (!movie.imdbID) {
        console.error("❌ Missing imdbID, skipping");
        continue;
      }

      const exists = await Movie.findOne({ imdbID: movie.imdbID });
      if (exists) {
        // console.log(`⚠️ Already exists: ${movie.Title}`);
        continue;
      }

      await Movie.create({
        title: movie.Title,
        year: movie.Year,
        rated: movie.Rated,
        released: movie.Released,
        runtime: movie.Runtime,
        genre: movie.Genre,
        director: movie.Director,
        actors: movie.Actors,
        plot: movie.Plot,
        poster: movie.Poster,
        imdbID: movie.imdbID,
        imdbRating: movie.imdbRating
      });

      // console.log(`✅ Inserted: ${movie.Title}`);
    } catch (error) {
      console.error(
        `🔥 Failed for ${id}:`,
        error.response?.data || error.message
      );
      // IMPORTANT: do NOT throw
    }
  }

  // console.log("📦 Movie queue finished");
};

export default insertMovies; 