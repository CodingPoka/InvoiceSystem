



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../validation/cookieValidation";

const Invoice2 = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [invoiceCode, setInvoiceCode] = useState("");

  const navigate = useNavigate();

  // Generate unique 8-digit invoice code
  const generateInvoiceCode = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get("/api/getProduct");
        if (response.data && response.data.products) {
          setServices(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setServiceName(value);

    const filteredSuggestions = services.filter((service) =>
      service.productName.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const addItem = () => {
    if (serviceName && price > 0 && quantity > 0) {
      setItems((prevItems) => [
        ...prevItems,
        { serviceName, price, quantity, total: price * quantity },
      ]);
      setServiceName("");
      setPrice(0);
      setQuantity(1);
      setSuggestions([]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    if (items.length > 0 && name && phone && address) {
      const newInvoiceCode = generateInvoiceCode();
      setInvoiceCode(newInvoiceCode);
      setIsSaved(true);

      const totalAmount = items.reduce((total, item) => total + item.total, 0);

      const invoiceData = {
        invoiceCode: newInvoiceCode,
        customerName: name,
        phone,
        address,
        items,
        totalAmount,
      };

      try {
        const response = await axiosInstance.post("/api/saveInvoice", invoiceData);
        if (response.status === 200) {
          console.log("Invoice saved successfully:", response.data);
        }
      } catch (error) {
        console.error("Error saving invoice:", error);
      }

      setTimeout(() => handlePrint(), 200);
    }
  };

  const totalAmount = items.reduce((total, item) => total + item.total, 0);
  const todayDate = new Date().toLocaleDateString();

  return (
    <div className="flex flex-col md:flex-row items-start justify-between min-h-screen bg-gray-100 p-4">
      {!isSaved && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
          <h2 className="text-2xl font-semibold text-center mb-4">Customer Details</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer Name" className="w-full border p-2 rounded mb-4"/>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full border p-2 rounded mb-4"/>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full border p-2 rounded mb-4"/>
          <h2 className="text-2xl font-semibold text-center mt-6 mb-4">Add Laundry Service</h2>
          <input type="text" value={serviceName} onChange={handleServiceChange} placeholder="Service Name" className="w-full border p-2 rounded mb-4"/>
          {suggestions.length > 0 && (
            <ul className="border rounded max-h-40 overflow-auto">
              {suggestions.map((service, idx) => (
                <li key={idx} onClick={() => { setServiceName(service.productName); setPrice(service.productPrice); setSuggestions([]); }} className="p-2 cursor-pointer hover:bg-gray-100">{service.productName} - ${service.productPrice}</li>
              ))}
            </ul>
          )}
          <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full border p-2 rounded mb-4"/>
          <button onClick={addItem} className="w-full bg-blue-500 text-white p-2 rounded">Add Service</button>
        </div>
      )}

      <div className="invoice-section bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-semibold text-center">Top Clean</p>
          </div>
          <div className="text-right">
            <p className="text-xl">Invoice No: {invoiceCode}</p>
            <p className="text-xl">Date: {todayDate}</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <p className="text-xl font-semibold">Invoice To:</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {address}</p>
        </div>
        <table className="w-full text-center mb-4">
          <thead>
            <tr>
              <th>Service</th><th>Quantity</th><th>Price</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}><td>{item.serviceName}</td><td>{item.quantity}</td><td>${item.price}</td><td>${item.total}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="text-xl font-semibold mt-4 text-right">Total: ${totalAmount}</p>
        <hr className="my-4" />
        <div className="flex justify-between">
          <div>
            <p><strong>Shop Name:</strong> Top Clean</p>
            <p><strong>Email:</strong> topclenlaundryservice@gmail.com</p>
            <p><strong>Phone1:</strong> 0111766687 </p>
            <p><strong>Phone2:</strong>  0900038537</p>
            <p><strong>Address:</strong> Dammadina,Port Sudan,Sudan</p>
          </div>
        </div>
        {!isSaved ? <button onClick={handleSave} className="w-full bg-green-500 text-white p-2 mt-4">Save Invoice</button> : <button onClick={handlePrint} className="w-full bg-blue-500 text-white p-2 mt-4">Print Invoice</button>}
      </div>
    </div>
  );
};

export default Invoice2;
