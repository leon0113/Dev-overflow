import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true); // to prevent unknown field queries

    if (!process.env.MONGODB_URL) return console.log("Missing MONGODB URL");

    if (isConnected) {
        console.log("Already connected to database");
        return;
    }


    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'devOverflow'
        });

        isConnected = true;
        console.log('Database connected successfully');
    } catch (error) {
        console.log("Database connection failded: ", error);
    }
}