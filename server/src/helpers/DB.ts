import mongoose from "mongoose";

export const connectDB = async (MONGO_URI: string) : Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}