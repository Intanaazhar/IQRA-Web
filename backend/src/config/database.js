import mongoose from "mongoose"; //mongoose - something that talk to the database

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`\nMongoDB connected!! ${connectionInstance.connection.host}`); //using backtick, wew thats new

    } catch (error) {
        console.log("MongoDB connection failed: ");
        console.error("Message:", error.message);
        console.error("Code:", error.code);
        console.error("Stack:", error.stack);
        process.exit(1)
    }
};

export default connectDB;