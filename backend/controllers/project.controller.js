import ProjectModel from "../models/project.model.js";

export const CreateProject = async (req, res) => {
  try {
    const { projectTitle, description,githubUrl,imageUrl,liveWebsiteUrl,isCompleted } = req.body;
    if (!projectTitle || !description || !githubUrl || !imageUrl ||!liveWebsiteUrl ||!isCompleted) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const response = await ProjectModel.findOne({ projectTitle });
    if (response) {
      return res
        .status(400)
        .json({ success: false, message: "Project already exist" });
    }
    const newProject = new ProjectModel(req.body);
    await newProject.save();
    res
      .status(201)
      .json({ success: true, message: "Project Created", newProject });
  } catch (error) {
    console.log("CreateSkill: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const GetAllProjects= async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    if (!projects) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Projects Fetched", data: projects });
  } catch (error) {
    console.log("GetAllProjects: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const GetProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findById(id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Project Fetched", data: project });
  } catch (error) {
    console.log("GetProjectById: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const DeleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ProjectModel.findByIdAndDelete(id);
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    return res.status(200).json({ success: true, message: "Project Deleted" });
  } catch (error) {
    console.log("DeleteProject: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const UpdateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectTitle, description,githubUrl,imageUrl,liveWebsiteUrl,isCompleted } = req.body;

    if (!projectTitle || !description || !githubUrl || !imageUrl ||!liveWebsiteUrl ||!isCompleted) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

    const updatedProject=await ProjectModel.findByIdAndUpdate(id, req.body);
    if(!updatedProject){
      return res
      .status(404)
      .json({ success: false, message: "Project not found" });
    }
    return res.status(200).json({ success: true, message: "Project Updated"});
  } catch (error) {
    console.log("UpdateProject: Internal Server Error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
