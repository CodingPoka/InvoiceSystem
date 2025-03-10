const productModel = require("../models/productSchema");

exports.addProduct = async (req, res) => {
  try {
    const { productName, productPrice } = req.body;

    // Check if productName and productPrice are provided
    if (!productName) {
      return res.status(400).json({ message: "Product name is required" });
    }

    if (!productPrice) {
      return res.status(400).json({ message: "Product price is required" });
    }

    // Check if the product with the same name already exists
    const existingProduct = await productModel.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create new product
    const newProduct = new productModel({
      productName,
      productPrice,
    });

    // Save the product to the database
    await newProduct.save();

    // Send success response
    res.status(200).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete product controler
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//update product controller
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productPrice } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { productName, productPrice },
      { new: true }
    );

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




exports.getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await productModel.find();

    // If no products are found, return a message
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Send success response with the products
    res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const invoiceModel = require("../models/invoiceSchema");

// exports.saveInvoice = async (req, res) => {
//   try {
//     const { customerName, phone, address, items, totalAmount } = req.body;

//     // Validate required fields
//     if (!customerName || !phone || !address || !items || !totalAmount) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Generate a unique 8-digit invoice code
//     const invoiceCode = Math.floor(10000000 + Math.random() * 90000000).toString();

//     // Create new invoice
//     const newInvoice = new invoiceModel({
//       invoiceCode,
//       customerName,
//       phone,
//       address,
//       items,
//       totalAmount,
//       date: new Date(),
//     });

//     // Save the invoice to the database
//     await newInvoice.save();

//     // Send success response
//     res.status(200).json({ message: "Invoice saved successfully", invoice: newInvoice });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



//dashboard controller

exports.saveInvoice = async (req, res) => {
  try {
    const { invoiceCode, customerName, phone, address, items, totalAmount } = req.body;

    if (!invoiceCode || !customerName || !phone || !address || !items || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newInvoice = new invoiceModel({ invoiceCode, customerName, phone, address, items, totalAmount, date: new Date() });
    await newInvoice.save();

    res.status(200).json({ message: "Invoice saved successfully", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};









//dashboard controller

exports.getDashboardMetrics = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0)); // Start of today
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of this month

    // Total Orders
    const totalOrders = await invoiceModel.countDocuments();

    // Today's Orders (using the `date` field)
    const todayOrders = await invoiceModel.countDocuments({
      date: { $gte: startOfToday },
    });

    // This Month's Orders (using the `date` field)
    const thisMonthOrders = await invoiceModel.countDocuments({
      date: { $gte: startOfMonth },
    });

    // Total Income
    const totalIncomeResult = await invoiceModel.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].total : 0;

    // Today's Income (using the `date` field)
    const todayIncomeResult = await invoiceModel.aggregate([
      { $match: { date: { $gte: startOfToday } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const todayIncome = todayIncomeResult.length > 0 ? todayIncomeResult[0].total : 0;

    // This Month's Income (using the `date` field)
    const thisMonthIncomeResult = await invoiceModel.aggregate([
      { $match: { date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const thisMonthIncome = thisMonthIncomeResult.length > 0 ? thisMonthIncomeResult[0].total : 0;

    // Completed Orders
    const completedOrders = await invoiceModel.countDocuments({
      status: "Completed",
    });

    // Pending Orders
    const pendingOrders = await invoiceModel.countDocuments({
      status: "Pending",
    });

    // Send response
    res.status(200).json({
      totalOrders,
      todayOrders,
      thisMonthOrders,
      totalIncome,
      todayIncome,
      thisMonthIncome,
      completedOrders,
      pendingOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await invoiceModel.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark an order as completed
exports.markOrderAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    // Update the order status and set the completion date
    const updatedOrder = await invoiceModel.findByIdAndUpdate(
      id,
      { status: "Completed", completedDate: new Date() },
      { new: true } // Return the updated order
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order marked as completed", updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
