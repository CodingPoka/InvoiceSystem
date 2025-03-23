

import React from "react";
import {  useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const navigate=useNavigate();
    const token = localStorage.getItem("authToken"); // Get token from localStorage

    return token ? element : navigate("/");
};

export default PrivateRoute;


