import bcryptjs from "bcryptjs";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const CreateUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const response = await UserModel.findOne({ userName });
    if (response) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }
    const hashedPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new UserModel({ userName, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: "User Created", userName });
  } catch (error) {
    console.log("CreateUser: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const LogIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const userExist = await UserModel.findOne({ userName });
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const comparePassword = await bcryptjs.compare(
      password,
      userExist.password
    );
    if(!comparePassword){
      res.status(401).json({success:false, message:"Invalid Credentials"})
    }
    const payLoad = {
      id: userExist._id,
      userName: userExist.userName,
    };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user: payLoad });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const LogOut = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    // Return success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // Handle error
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
