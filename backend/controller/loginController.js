const jwt = require("jsonwebtoken");

const loginModel = require("../models/loginSchema");
require("dotenv").config();

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await loginModel.findOne({email});
       
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email Address"
            });
        }

        // Check if password matches
        if (password !== user.password) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }

       //if all correct then generate jwt token

       const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })

    res.cookie("token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    //return response that login successfull


        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



//logout controller

exports.logout= async(req,res)=>{
    try{
 
     res.clearCookie("token",{
         httpOnly:true,
         secure: process.env.NODE_ENV ==="production",
         sameSite: process.env.NODE_ENV === "production"? "none":"strict"
     });
 
     //return logout response
     return res.status(200).json({
         success:true,
         message:"Logout Successfull"
     });
 
    }catch(error){
     return res.status(500).json({
         success:false,
         message:error.message
     })
    }
 
 }