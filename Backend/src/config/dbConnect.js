import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const mongoDbConnection = await mongoose.connect(process.env.DB_URI);
    console.log(mongoDbConnection.connection.host);
  } catch (error) {
    console.log(`Database connection failed, ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
