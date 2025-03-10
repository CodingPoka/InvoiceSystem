import axios from 'axios';
import React, { useState } from 'react';
import axiosInstance from '../validation/cookieValidation';



const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if fields are empty
        if (!productName || !productPrice) {
            alert('Please fill in all fields');
            return;
        }
       

        setIsLoading(true);  // Show loading state

        try {
          const response = await axiosInstance.post("/api/addProduct", {
            productName,
            productPrice,
          });

          if (response.status === 200) {
            console.log("Product Added Successfully!");
            alert("Product Added Successfully");
            setProductName('');
            setProductPrice('');
          }

        } catch (error) {
            if (error.response) {
                // Show specific validation error messages
                console.log(error.response.data.message);
                alert(error.response.data.message);
            } else {
              console.log(error);
              alert("Something went wrong");
            }
        } finally {
            setIsLoading(false); // Hide loading state after request
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-700 text-sm font-medium mb-2">Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="productPrice" className="block text-gray-700 text-sm font-medium mb-2">Product Price</label>
                        <input
                            type="number"
                            id="productPrice"
                            name="productPrice"
                            required
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading} // Disable the button while loading
                    >
                        {isLoading ? "Saving..." : "Save Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
