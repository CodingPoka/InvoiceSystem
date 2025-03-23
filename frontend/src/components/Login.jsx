import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axiosInstance from "../validation/cookieValidation";
import { useNavigate } from "react-router-dom";

const Login = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const response= await axiosInstance.post("/api/login",{
        email, password
      },{ withCredentials: true })

      if(response.status ===200){
        

        const token = response.data.token;
        if (token) {
            localStorage.setItem("authToken", token); // Store token in localStorage
            alert("Login Successfull");
            setIsLoggedIn(true);
            navigate("/dashboard");
        }
        
        
      }
    }catch(error){

      if (error.response) {
          // Show all validation errors in an alert, each on a new line
          console.log(error.response.data.message);
          alert(error.response.data.message)
      } else {
        console.log(error);
          alert("Something went wrong");
      }
      
      
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Enter Valid Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


