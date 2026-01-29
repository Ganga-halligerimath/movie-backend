// // // routes/admin.js
// // import express from "express";
// // import { adminMiddleware } from "../middleware/adminMiddleware.js";

// // const router = express.Router();

// // router.post("/add", adminMiddleware, (req, res) => {
// //   const { title, description } = req.body;
// //   // For now just return the movie data
// //   res.status(201).json({ msg: "Movie added", movie: { title, description } });
// // });

// // export default router;


// import express from "express";
// import { adminMiddleware } from "../middleware/adminMiddleware.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/add", protect, adminMiddleware, (req, res) => {
//   console.log(req);
//   const { title, description } = req.body;
//   res.status(201).json({
//     msg: "Movie added",
//     movie: { title, description }
//   });
// });

// export default router;

import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { addMovie } from "../controllers/movieController.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/add",
  protect,
  adminOnly,
  upload.single("poster"),
  addMovie
);

export default router;
