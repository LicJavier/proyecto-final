import { Schema , model } from "mongoose";

export const productSchema = new Schema({
    name : { type: String, require: true},
    category: { type: String,  require: true },
    stock: { type: Number, require: true },
    price: { type: Number, require: true },
    img: { type: String, require: true },
    description: { type: String, require: true}
})

export const productModel = model('product', productSchema)