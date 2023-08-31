const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    productName: { type: String, required: true },
    Name: { type: String,},
    productDescription: { type: String, required : true},
    purchaseDate: { type: String, required : true},
    sellingPrice: { type: String, required: true },
    photo: { type: String, },
    contact :{type: String,required:true},
    useremail: { type: String,  },
    category: { type: String, },
    negotiable: { type: String },
},{ timestamps: true })

const Product = mongoose.model('product', ProductSchema)
module.exports = Product;
