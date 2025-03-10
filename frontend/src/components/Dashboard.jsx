


import React, { useState, useEffect } from "react";
import axiosInstance from "../validation/cookieValidation"; // Make sure this is your axios instance for API requests

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    todayOrders: 0,
    thisMonthOrders: 0,
    totalIncome: 0,
    todayIncome: 0,
    thisMonthIncome: 0,
    completedOrders: 0,
    pendingOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard metrics
  const fetchDashboardMetrics = async () => {
    try {
      const response = await axiosInstance.get("/api/dashboard");
      console.log(response.data); // Check the data structure
      setMetrics(response.data);
    } catch (error) {
      console.error("Error fetching dashboard metrics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch metrics when the component mounts
  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
            <p className="text-2xl font-bold">{metrics.totalOrders}</p>
          </div>

          {/* Today's Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Today's Orders</h2>
            <p className="text-2xl font-bold">{metrics.todayOrders}</p>
          </div>

          {/* This Month's Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">This Month's Orders</h2>
            <p className="text-2xl font-bold">{metrics.thisMonthOrders}</p>
          </div>

          {/* Total Income */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Income</h2>
            <p className="text-2xl font-bold">${metrics.totalIncome.toFixed(2)}</p>
          </div>

          {/* Today's Income */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Today's Income</h2>
            <p className="text-2xl font-bold">${metrics.todayIncome.toFixed(2)}</p>
          </div>

          {/* This Month's Income */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">This Month's Income</h2>
            <p className="text-2xl font-bold">${metrics.thisMonthIncome.toFixed(2)}</p>
          </div>

          {/* Completed Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Completed Orders</h2>
            <p className="text-2xl font-bold">{metrics.completedOrders}</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Pending Orders</h2>
            <p className="text-2xl font-bold">{metrics.pendingOrders}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;