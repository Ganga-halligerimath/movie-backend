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



// src/app.js
import express from "express";
import cors from "cors";

import errorHandler from "./middleware/errorMiddleware.js";  
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import movieQueue from "./queue/movieQueue.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// CORS: allow localhost and Vercel frontend
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://moive-ebus.vercel.app/"
  ],
  credentials: true
}));

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
