const mongoose = require("mongoose");
require("dotenv").config();

const db_url = process.env.DB_URL;

exports.dbConnect = async () => {
    try {
        await mongoose.connect(db_url, {
            connectTimeoutMS: 10000, // 10 seconds
            socketTimeoutMS: 10000,  // 10 seconds
        });
        console.log("Database is connected");
    } catch (error) {
        console.log("Database is not connected");
        console.log(error.message);
        process.exit(1);
    }
};
