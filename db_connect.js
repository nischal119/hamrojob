import mongoose from "mongoose";

export const db_connect = async () => {
  try {
    await mongoose.connect(
      encodeURI(
        "mongodb+srv://dhungeln12:nischal2468@school.clw64jm.mongodb.net/jobFinder?retryWrites=true&w=majority"
      )
    );
    console.log("DB connection: OK");
  } catch (error) {
    console.log("DB connection :failed");
    console.log(error.message);
  }
};
