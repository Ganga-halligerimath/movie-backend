// src/server.js
import dotenv from "dotenv";
dotenv.config(); // initialize environment variables

import app from "./app.js";
import connectDB from "./config/db.js";

console.log("JWT_SECRET 👉", process.env.JWT_SECRET);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
