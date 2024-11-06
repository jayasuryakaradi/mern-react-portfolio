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

//Fallback route to catch all 404 errors
app.get('/',(req,res)=>{
  res.send("Hello")
})

app.use("/api/auth", authRoute);
app.use("/api/skills", skillRoute);
app.use("/api/projects", projectRoute);



app.listen(process.env.PORT, () => {
  dbConnection();
  console.log("Connected to Server");
});
