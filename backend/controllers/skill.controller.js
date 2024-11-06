import SkillModel from "../models/skill.model.js";

export const CreateSkill = async (req, res) => {
  try {
    const { skillTitle, level } = req.body;
    if (!skillTitle || !level) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const response = await SkillModel.findOne({ skillTitle });
    if (response) {
      return res
        .status(400)
        .json({ success: false, message: "Skill already exist" });
    }
    const newSkill = new SkillModel({ skillTitle, level });
    await newSkill.save();
    res
      .status(201)
      .json({ success: true, message: "Skill Created", skillTitle });
  } catch (error) {
    console.log("CreateSkill: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const GetAllSkills = async (req, res) => {
  try {
    const skills = await SkillModel.find();
    if (!skills) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Skills Fetched", data: skills });
  } catch (error) {
    console.log("GetAllSkills: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const GetSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await SkillModel.findById(id);
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Skills Fetched", data: skills });
  } catch (error) {
    console.log("GetAllSkills: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const DeleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await SkillModel.findByIdAndDelete(id);
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    return res.status(200).json({ success: true, message: "Skills Deleted" });
  } catch (error) {
    console.log("DeleteSkill: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const UpdateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skillTitle, level } = req.body;
    if (!skillTitle || !level) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const updatedSkill=await SkillModel.findByIdAndUpdate(id, req.body);
    if(!updatedSkill){
      return res
      .status(404)
      .json({ success: false, message: "Skill not found" });
    }
    return res.status(200).json({ success: true, message: "Skills Updated" });
  } catch (error) {
    console.log("UpdateSkill: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
