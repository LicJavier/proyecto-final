import { Schema , model } from "mongoose";

export const messageSchema = new Schema({
    user : { type: String, require: true},
    bodyMessage: { type: String , require: true},
    date: {  type: Date, default: Date.now}
})

export const messageModel = model('message', messageSchema)