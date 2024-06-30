import mongoose from "mongoose";

connect().catch(err => console.error("Failed to connect to MongoDB:", err));

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tux_sanctuary');
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
