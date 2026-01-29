// // src/routes/movieRoutes.js
// import express from "express";
// import auth from "../middleware/authMiddleware.js";
// import admin from "../middleware/roleMiddleware.js";
// import * as ctrl from "../controllers/movieController.js";

// const router = express.Router();

// router.get("/", ctrl.getMovies);
// router.get("/search", ctrl.searchMovies);
// router.get("/sorted", ctrl.sortMovies);

// router.post("/", auth, admin("admin"), ctrl.addMovie);
// router.put("/:id", auth, admin("admin"), ctrl.updateMovie);
// router.delete("/:id", auth, admin("admin"), ctrl.deleteMovie);

// export default router;

import express from "express";
import {
  getMovies,
  searchMovies,
  sortMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieById
} from "../controllers/movieController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/sorted", sortMovies);
router.get("/:id", getMovieById); // ✅ ADD THIS

// 🔐 ADMIN ONLY

router.post("/add", protect, adminOnly, addMovie);


router.put("/:id", protect, adminOnly, updateMovie);
router.delete("/:id", protect, adminOnly, deleteMovie);


export default router;
