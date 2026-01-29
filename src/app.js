// // src/app.js
// import express from "express";
// import cors from "cors";

// // ⚠ Make sure to include .js for local files
// import errorHandler from "./middleware/errorMiddleware.js";  
// import authRoutes from "./routes/authRoutes.js";
// import movieRoutes from "./routes/movieRoutes.js";
// import movieQueue from "./queue/movieQueue.js";
// import adminRoutes from "./routes/adminRoutes.js"

// const app = express();

// app.use(cors({
//   origin: ["http://localhost:3000",
//      "https://moive-nwzn.vercel.app"],
//   credentials: true
// }))
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/movies", movieRoutes);
// app.use("/api/admin", adminRoutes);

// // Queue
// movieQueue();

// // Error middleware must come last
// app.use(errorHandler);

// export default app;   // ES Modules export



import express from "express";

import errorHandler from "./middleware/errorMiddleware.js";  
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import movieQueue from "./queue/movieQueue.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://moive-ebus.vercel.app"
];

// CORS middleware - must come before routes
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// JSON parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/admin", adminRoutes);

// Queue
movieQueue();

// Error middleware
app.use(errorHandler);

export default app;
