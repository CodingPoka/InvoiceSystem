


import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../validation/cookieValidation";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/orders");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}/complete`);
      if (response.status === 200) {
        alert("Order marked as completed");
        fetchOrders();
      }
    } catch (error) {
      console.error("Error completing order:", error);
      alert("Failed to complete order");
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.invoiceCode.includes(searchQuery)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Invoice Code"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md max-h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
            {filteredOrders.filter((order) => order.status !== "Completed").map((order) => (
              <div
                key={order._id}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <p><strong>Invoice Code:</strong> {order.invoiceCode}</p>
                <p><strong>Name:</strong> {order.customerName}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCompleteOrder(order._id);
                  }}
                  className="mt-2 py-1 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Mark as Completed
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md max-h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Completed Orders</h2>
            {filteredOrders.filter((order) => order.status === "Completed").map((order) => (
              <div
                key={order._id}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <p><strong>Invoice Code:</strong> {order.invoiceCode}</p>
                <p><strong>Name:</strong> {order.customerName}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Completed Date:</strong> {new Date(order.completedDate).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            <p><strong>Invoice Code:</strong> {selectedOrder.invoiceCode}</p>
            <p><strong>Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
            <h3 className="text-xl font-semibold mt-4">Items</h3>
            <table className="min-w-full table-auto mt-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Service</th>
                  <th className="px-4 py-2 border-b">Quantity</th>
                  <th className="px-4 py-2 border-b">Price</th>
                  <th className="px-4 py-2 border-b">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{item.serviceName}</td>
                    <td className="px-4 py-2 border-b">{item.quantity}</td>
                    <td className="px-4 py-2 border-b">${item.price}</td>
                    <td className="px-4 py-2 border-b">${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
