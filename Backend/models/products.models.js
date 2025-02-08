import mongoose from 'mongoose'

const producrShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
            required: true
        }
        
    }, { timestamps: true })

export const Product = mongoose.model("Product", producrShema)