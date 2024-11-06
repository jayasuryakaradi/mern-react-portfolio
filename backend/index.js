import express from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/dbConnection.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import skillRoute from "./routes/skill.route.js";
import projectRoute from "./routes/project.route.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/skills", skillRoute);
app.use("/api/projects", projectRoute);

//Fallback route to catch all 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(process.env.PORT, () => {
  dbConnection();
  console.log("Connected to Server");
});
