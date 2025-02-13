import { Product } from '../models/products.models.js'
import { destroyCloudinary, uploadCloudnary } from '../utils/Claoudnary.js'

const createProduct = async (req, res) => {
    try {
        const { name, about, price } = req.body

        if ([name, about, price].some((field) => field?.trim() === "")) {
            return res.status(400).json({
                sucess: false,
                data: null,
                message: "All field required"
            })
        }

        const productImgLocalPath = req.file?.path

        if (!productImgLocalPath) {
            return res.status(400).json({
                sucess: false,
                data: null,
                message: "Product Image is required"
            })
        }
        const productImage = await uploadCloudnary(productImgLocalPath)

        const product = new Product({
            name,
            price,
            about,
            productImage
        })

        await product.save()

        const createProduct = await Product.findById(product._id)

        if (!createProduct) {
            return res.status(500).json({
                sucess: false,
                data: null,
                message: "Internal Server Error"
            })
        }
        return res.status(201).json({
            sucess: true,
            data: product,
            message: "Product Create Successfully"
        })
    } catch (error) {
        throw new Error(error.message)

    }
}

const getAllProducts = async (req, res) => {
    const products = await Product.find()

    res.status(200).json({
        sucess: true,
        data: products,
        message: "All Products Fetched Successfully"
    })
}

const getProduct = async (req, res) => {
    const { productId } = req.params

    if (!productId) {
        return res.status(400)
            .json({
                success: false,
                data: null,
                message: "Product id required"
            })
    }
    const product = await Product.findById(productId)

    if (!product) {
        return res.status(404)
            .json({
                success: false,
                data: null,
                message: "Product not found"
            })
    }
    res.status(200).json({
        success: true,
        data: product,
        message: "Product Found Successsfully"
    })
}

const updateProductField = async (req, res) => {
    try {
        const { productId } = req.params
        const { name, about, price } = req.body

        if (!productId) {
            return res.status(400)
                .json({
                    success: false,
                    data: null,
                    message: "Product id required"
                })
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId,
            {
                $set: {
                    name,
                    about,
                    price
                },
            },
            {
                new: true
            }
        )

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Product Update Successfully"
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params // req.params.id

        if (!productId) {
            return res.status(400)
                .json({
                    success: false,
                    data: null,
                    message: "Product id required"
                })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404)
                .json({
                    success: false,
                    data: null,
                    message: "Product not found"
                })
        }

        await destroyCloudinary(product.productImage)
        const deleteProduct = await Product.findByIdAndDelete(product._id, { new: true })

        res.status(200).json({
            success: true,
            data: deleteProduct,
            message: "Product Delete Successfully"
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    createProduct,
    getAllProducts,
    getProduct,
    updateProductField,
    deleteProduct
}