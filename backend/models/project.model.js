import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    projectTitle:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    githubUrl:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    liveWebsiteUrl:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
        required:true,
    }
},{timestamps:true});
const ProjectModel=mongoose.model("project", projectSchema)
export default ProjectModel;