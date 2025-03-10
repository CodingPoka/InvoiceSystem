

const mongoose=require("mongoose");

const productsSchema= new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    }
})

//creating model

const productModel= mongoose.model("product", productsSchema);

module.exports=productModel;