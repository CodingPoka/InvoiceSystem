const mongoose=require("mongoose");

require("dotenv").config();
const db_url=process.env.DB_URL;

exports.dbConnect=async()=>{
    try{

        await mongoose.connect(db_url);
        console.log("Database is connected");

    }catch(error){
        console.log("Database is not connected");
        console.log(error.message);
        process.exit(1);
    }
}