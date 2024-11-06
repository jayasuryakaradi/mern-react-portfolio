import jwt from "jsonwebtoken";
import UserModal from "../models/user.model.js";
export const isAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Please Login " });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModal.findById(decoded.id);

    if (!user) {
      return res.status(403).json({ message: "Unauthorized: User not found" });
    }
    req.user = user;
    next();
    // }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


