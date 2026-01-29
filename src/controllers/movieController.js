// src/controllers/movieController.js
import Movie from "../models/Movie.js";

// Get all movies
export const getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

// Search movies by title, plot, or genre
export const searchMovies = async (req, res) => {
  const q = req.query.q || "";
  const movies = await Movie.find({
    $or: [
      { title: new RegExp(q, "i") },
      { plot: new RegExp(q, "i") },
      { genre: new RegExp(q, "i") }
    ]
  });
  res.json(movies);
};

// Sort movies
export const sortMovies = async (req, res) => {
  try {
    const sortBy = req.query.by || "titleAsc";

    // 🔹 HANDLE RELEASE DATE (string → date)
    if (sortBy === "releasedAsc" || sortBy === "releasedDesc") {
      const order = sortBy === "releasedAsc" ? 1 : -1;

      const movies = await Movie.aggregate([
        {
          $addFields: {
            releasedISO: {
              $dateFromString: {
                dateString: "$released",
                format: "%d %b %Y"
              }
            }
          }
        },
        { $sort: { releasedISO: order } },
        {
          $project: {
            releasedISO: 0 // remove temp field
          }
        }
      ]);

      return res.json(movies);
    }

    // 🔹 NORMAL SORT (no aggregation needed)
    let sortOption = {};

    switch (sortBy) {
      case "titleAsc":
        sortOption = { title: 1 };
        break;
      case "titleDesc":
        sortOption = { title: -1 };
        break;
      case "imdbRatingAsc":
        sortOption = { imdbRating: 1 };
        break;
      case "imdbRatingDesc":
        sortOption = { imdbRating: -1 };
        break;
      default:
        sortOption = { title: 1 };
    }

    const movies = await Movie.find().sort(sortOption);
    res.json(movies);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Add a new movie
export const addMovie = async (req, res) => {
  // res.status(400).json({ message: 'here' });
  // console.log(req.body)
  const {
    title, year, rated, released, runtime, genre, director,
    actors, plot, poster, imdbID
  } = req.body;

  const formatDateToDDMonYYYY = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

  const generateImdbId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

  const imdbIdFinal = imdbID || generateImdbId();

  const formattedReleased = formatDateToDDMonYYYY(released);
  // if (!imdbID) return res.status(400).json({ message: "IMDb ID is required" });

  const movie = await Movie.create({
    title,
    year,
    rated,
    released:formattedReleased,
    runtime,
    genre,
    director,
    actors,
    plot,
    poster,
    imdbID: imdbIdFinal,
    imdbLink: `https://www.imdb.com/title/${imdbIdFinal}/`
  });

  res.json(movie);
};

// Update a movie
export const updateMovie = async (req, res) => {

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(movie);
};

// Delete a movie
export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
