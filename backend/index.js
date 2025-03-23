
const express=require("express");
const { dbConnect } = require("./config/dbConnection");
const cookieParser=require("cookie-parser");
const cors = require("cors");

const app=express();
//require port
require("dotenv").config();
const port=process.env.PORT;
const productRouter=require("./routes/productRoutes");

//use cors
app.use(cors({
    origin: ['http://localhost:5173', 'https://frontend-one-opal-16.vercel.app'], // Allow both local and deployed frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

//use cookie parser

app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api",productRouter);



app.get("/",(req,res)=>{
    res.send("Home Page");
})


app.listen(port,async ()=>{
    console.log(`Server is running successfully at http://localhost:${port}`);
    await dbConnect();
})


