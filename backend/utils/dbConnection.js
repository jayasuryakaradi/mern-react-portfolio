import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    if (response) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("Issue connecting to MongoDB");
  }
};
export default dbConnection;