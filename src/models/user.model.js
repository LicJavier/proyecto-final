import {Schema, model} from "mongoose";
import { cartSchema } from "./cart.model.js";
import { orderSchema } from "./order.model.js"

export const userSchema = Schema({
    name: { type: String,  require: true },
    password: { type: String,  require: true },
    email: { type: String,  require: true },
    surname :{ type: String,  require: true },
    address : { type: String,  require: true },
    age :{ type: Number,  require: true },
    order: [ orderSchema ],
    cart: [ cartSchema ]
});

export const userModel = model('user', userSchema);
