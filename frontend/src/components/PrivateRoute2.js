// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ element }) => {
//     const token = localStorage.getItem("authToken"); // Get token from localStorage

//     return token ? element : <Navigate to="/" replace />;
// };

// export default PrivateRoute;

// import React from "react";
// import  {Navigate}  from "react-router-dom";

// const PrivateRoute = ({ element }) => {
//     const token = localStorage.getItem("authToken"); // Get token from localStorage
//     console.log(token);
//     return token ? element : <Navigate to="/" replace />;
// };

// export default PrivateRoute;

import React from "react";
import {  useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const navigate=useNavigate();
    const token = localStorage.getItem("authToken"); // Get token from localStorage

    return token ? element : navigate("/");
};

export default PrivateRoute;


