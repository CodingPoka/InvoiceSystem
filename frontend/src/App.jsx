


// import React, { useState } from 'react';
// import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Navbar from './components/Navbar';
// import AddProduct from './components/AddProduct';
// import Invoice2 from './components/Invoice2';
// import ServiceList from './components/ServiceList';
// import Orders from './components/Orders';


// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

 
 

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login setIsLoggedIn={setIsLoggedIn} />,
//     },
//     {
//       path: "/addProduct",
//       element: isLoggedIn ? (
//         <div>
//           <Navbar setIsLoggedIn={setIsLoggedIn} />
//           <AddProduct />
//         </div>
//       ) : (
//         <Navigate to="/" replace />
//       ),
//     },
//     {
//       path: "/serviceList",
//       element: isLoggedIn ? (
//         <div>
//           <Navbar setIsLoggedIn={setIsLoggedIn} />
//           <ServiceList />
//         </div>
//       ) : (
//         <Navigate to="/" replace />
//       ),
//     },
//     {
//       path: "/invoice",
//       element: isLoggedIn ? (
//         <div>
//           <Navbar setIsLoggedIn={setIsLoggedIn} />
//           <Invoice2 />
//         </div>
//       ) : (
//         <Navigate to="/" replace />
//       ),
//     },
//     {
//       path: "/dashboard",
//       element: isLoggedIn ? (
//         <div>
//           <Navbar setIsLoggedIn={setIsLoggedIn} />
//           <Dashboard />
//         </div>
//       ) : (
//         <Navigate to="/" replace />
//       ),
//     },
//     {
//       path: "/orders",
//       element: isLoggedIn ? (
//         <div>
//           <Navbar setIsLoggedIn={setIsLoggedIn} />
//           <Orders />
//         </div>
//       ) : (
//         <Navigate to="/" replace />
//       ),
//     },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import Invoice2 from "./components/Invoice2";
import ServiceList from "./components/ServiceList";
import Orders from "./components/Orders";
import PrivateRoute from "./components/PrivateRoute2.js";



const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check token on app load
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const router = createBrowserRouter([
        { path: "/", element: <Login setIsLoggedIn={setIsLoggedIn} /> },
        { path: "/addProduct", element: <PrivateRoute element={<><Navbar setIsLoggedIn={setIsLoggedIn} /><AddProduct /></>} /> },
        { path: "/serviceList", element: <PrivateRoute element={<><Navbar setIsLoggedIn={setIsLoggedIn} /><ServiceList /></>} /> },
        { path: "/invoice", element: <PrivateRoute element={<><Navbar setIsLoggedIn={setIsLoggedIn} /><Invoice2 /></>} /> },
        { path: "/dashboard", element: <PrivateRoute element={<><Navbar setIsLoggedIn={setIsLoggedIn} /><Dashboard /></>} /> },
        { path: "/orders", element: <PrivateRoute element={<><Navbar setIsLoggedIn={setIsLoggedIn} /><Orders /></>} /> },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
