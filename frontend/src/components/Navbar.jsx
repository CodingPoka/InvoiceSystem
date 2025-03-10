


import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import axiosInstance from '../validation/cookieValidation';

const Navbar = ({setIsLoggedIn}) => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleLogout = async () => {
    try {
      // Call the backend logout API
        const response = await axiosInstance.post('/api/logout',{}, { withCredentials: true });

      if (response.data.success) {
        alert("Logout Successfull");
        localStorage.removeItem("authToken"); // Clear token
        
        // Redirect to login page after successful logout
        navigate('/'); // Use navigate instead of history.push
        setIsLoggedIn(false);
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <ul className="bg-sky-500 flex justify-center gap-7 text-white text-xl h-[50px] items-center">
        <h1>Top Clean</h1>
        
        <li>
          <NavLink to="/addProduct" className="hover:text-[#0000ff]">
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/serviceList" className="hover:text-[#0000ff]">
            Service List
          </NavLink>
        </li>
        <li>
          <NavLink to="/invoice" className="hover:text-[#0000ff]">
            Invoice
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className="hover:text-[#0000ff]">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="hover:text-[#0000ff]">
            Orders
          </NavLink>
        </li>

        <button onClick={handleLogout} className="hover:text-[#0000ff]">
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
  