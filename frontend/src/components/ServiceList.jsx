import axios from "axios";
import React, { useState, useEffect } from "react";
import axiosInstance from "../validation/cookieValidation";

const ServiceList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // State to track the product being edited
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Fetch all products from the backend
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/getProduct");
      if (response.data && response.data.products) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/deleteProduct/${productId}`);
        fetchProducts(); // Refresh the product list after deletion
        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setEditProduct(product);
    setEditName(product.productName);
    setEditPrice(product.productPrice);
  };

  // Handle update product
  const handleUpdate = async () => {
    if (!editName || !editPrice) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axiosInstance.put(`/api/updateProduct/${editProduct._id}`, {
        productName: editName,
        productPrice: editPrice,
      });

      if (response.status === 200) {
        alert("Product updated successfully");
        setEditProduct(null); // Reset edit state
        fetchProducts(); // Refresh the product list
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Products List</h2>

        {/* Edit Product Form */}
        {editProduct && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Product Price</label>
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Product
              </button>
              <button
                onClick={() => setEditProduct(null)}
                className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center">No products found</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Product Name</th>
                  <th className="px-4 py-2 border-b">Price</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-center">{product.productName}</td>
                    <td className="px-4 py-2 border-b text-center">${product.productPrice}</td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        onClick={() => handleEdit(product)}
                        className="mr-2 text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;