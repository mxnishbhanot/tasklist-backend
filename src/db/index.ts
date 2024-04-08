import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(String(process.env.MONGODB_URI));
        //eslint-disable-next-line no-console
        console.log('DB connected :)');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
