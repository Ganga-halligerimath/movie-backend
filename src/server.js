// // src/server.js
// import dotenv from "dotenv";
// dotenv.config(); // initialize environment variables

// import app from "./app.js";
// import connectDB from "./config/db.js";

// console.log("JWT_SECRET 👉", process.env.JWT_SECRET);

// // Connect to MongoDB
// connectDB();

// // const PORT = process.env.PORT || 5000;
// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });




// src/server.js
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
