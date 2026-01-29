import jwt from 'jsonwebtoken';

// Paste the token you got from login
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzcyODNiNWJhM2IyNjIxM2JkOTg0ZiIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Njk1MzM0MjYsImV4cCI6MTc2OTYxOTgyNn0.Fkg9UN0mUSEvEIE7i0cXJ10fMkcyapy4JDVF4aQdWTA";

// Must match the JWT_SECRET used in authController.js and middleware
const secret = 'your_jwt_secret_key';

try {
  const decoded = jwt.verify(token, secret);
  console.log("Decoded token:", decoded);
} catch (err) {
  console.error("Token verification failed:", err.message);
}
