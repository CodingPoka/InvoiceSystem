
const express=require("express");
const { addProduct, getProducts, saveInvoice, deleteProduct, updateProduct, getDashboardMetrics, getAllOrders, markOrderAsCompleted } = require("../controller/productController");
const { loginAdmin, logout } = require("../controller/loginController");
const { userAuth } = require("../validation/tokenValidation");
const router=express.Router();


//login routes

router.post("/login",loginAdmin);


//logout routes

router.post("/logout",logout);

//add product

router.post("/addProduct",userAuth,addProduct);

router.delete("/deleteProduct/:id",userAuth, deleteProduct);
router.put("/updateProduct/:id",userAuth, updateProduct);
router.get("/getProduct",userAuth, getProducts);
router.post("/saveInvoice",userAuth, saveInvoice);

//dashboard routes
router.get("/dashboard",userAuth, getDashboardMetrics);



// Get all orders
router.get("/orders",userAuth, getAllOrders);

// Mark an order as completed
router.put("/orders/:id/complete",userAuth, markOrderAsCompleted);




module.exports=router;