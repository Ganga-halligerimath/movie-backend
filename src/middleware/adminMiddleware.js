// import { addMovie } from "../controllers/movieController";
export const adminMiddleware = (req, res, next) => {
  
  console.log("req.user in admin:", req.user);

  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  // return res.status(401).json({message: req.body.token});

  next();
};
