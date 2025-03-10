
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
    origin: 'http://localhost:5173', // Allow only this origin (Vite frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies to be sent along with requests
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


