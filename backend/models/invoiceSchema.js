// const mongoose = require("mongoose");

// const invoiceSchema = new mongoose.Schema({
//   invoiceCode: { type: String, required: true, unique: true },
//   customerName: { type: String, required: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   items: [
//     {
//       serviceName: { type: String, required: true },
//       price: { type: Number, required: true },
//       quantity: { type: Number, required: true },
//       total: { type: Number, required: true },
//     },
//   ],
//   totalAmount: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Invoice", invoiceSchema);


const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceCode: { type: String, required: true, unique: true }, // Unique 8-digit invoice code
  customerName: { type: String, required: true }, // Customer name
  phone: { type: String, required: true }, // Customer phone number
  address: { type: String, required: true }, // Customer address
  items: [
    {
      serviceName: { type: String, required: true }, // Name of the service
      price: { type: Number, required: true }, // Price of the service
      quantity: { type: Number, required: true }, // Quantity of the service
      total: { type: Number, required: true }, // Total price (price * quantity)
    },
  ],
  totalAmount: { type: Number, required: true }, // Total amount of the invoice
  status: { type: String, default: "Pending" }, // Order status (Pending/Completed)
  date: { type: Date, default: Date.now }, // Date of order creation
  completedDate: { type: Date }, // Date when the order was completed
});

module.exports = mongoose.model("Invoice", invoiceSchema);