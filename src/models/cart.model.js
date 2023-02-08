import { Schema , model } from "mongoose";
import { productSchema } from "./product.model.js";

export const cartSchema = new Schema({
    products : [ productSchema ],
    date: {  type: Date, default: Date.now },
})

export const cartModel = model('cart', cartSchema)