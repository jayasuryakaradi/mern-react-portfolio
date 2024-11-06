import express from "express";
import { CreateUser, LogIn, LogOut } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/create-user", CreateUser);
authRoute.post("/login", LogIn);
authRoute.post("/logout", LogOut);

export default authRoute;
