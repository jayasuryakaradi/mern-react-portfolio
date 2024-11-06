import express from "express";
import { CreateProject, GetAllProjects, GetProjectById, DeleteProject, UpdateProject } from "../controllers/project.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";
const projectRoute = express.Router();

projectRoute.post("/add-project", isAdmin, CreateProject);
projectRoute.get("/", GetAllProjects)
projectRoute.get("/:id", GetProjectById)
projectRoute.delete("/:id", isAdmin, DeleteProject)
projectRoute.patch("/:id", isAdmin, UpdateProject)

export default projectRoute;
