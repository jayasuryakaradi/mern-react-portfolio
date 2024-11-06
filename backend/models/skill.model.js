import mongoose from "mongoose";

const skillSchema=new mongoose.Schema({
    skillTitle:{
        type:String,
        required:true,
    },
    level:{
        type:String,
        required:true,
    },
},{timestamps:true});
const SkillModel=mongoose.model("skill", skillSchema)
export default SkillModel;