import { Schema , model } from "mongoose";
import { cartSchema } from './cart.model.js'

export const orderSchema = new Schema({
    cart:  [cartSchema] ,
    date: {  type: Date, default: Date.now },
    state: {type: String, require: true},
    mail: { type: String, require: true},
    numberOrder: { type: Number, require: true}

})

export const orderModel = model('order', orderSchema)