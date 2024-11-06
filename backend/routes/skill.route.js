import express from "express";
import {
  CreateSkill,
  GetAllSkills,
  GetSkillById,
  DeleteSkill,
  UpdateSkill,
} from "../controllers/skill.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";

const skillRoute = express.Router();

skillRoute.post("/add-skill", isAdmin, CreateSkill);
skillRoute.get("/", GetAllSkills);
skillRoute.get("/:id", GetSkillById);
skillRoute.delete("/:id", isAdmin, DeleteSkill);
skillRoute.patch("/:id", isAdmin, UpdateSkill);

export default skillRoute;
