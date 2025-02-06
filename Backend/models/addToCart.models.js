import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quntity: {
        type: Number,
        required: true
    }
}, {timestamps: true})

export const AddToCart = mongoose.model("AddCart", addToCartSchema)