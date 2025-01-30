import mongoose from 'mongoose'

// connectdb function to connect mongodb database 
export const connectDB = async () =>{
    try{
        // connected through mongodb_uri , which is present at .env file.
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to MongoDB ${conn.connection.host}`);
    }
    catch(error){
        console.log("Failed to connected to MongoDB",error)
        process.exit(1); // 1 is failure and 0 is success message
    }
}