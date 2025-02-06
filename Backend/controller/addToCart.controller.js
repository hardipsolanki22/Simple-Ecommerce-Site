import { AddToCart } from "../models/addToCart.models.js";
import { Product } from "../models/products.models.js";


const addItem = async (req, res) => {
    try {
        const { productId } = req.params
        const { quntity } = req.body

        if (!productId) {
            return res.status(400)
                .json({
                    success: false,
                    data: null,
                    message: "Product id required"
                })
        }

        if (!quntity) {
            return res.status(400)
                .json({
                    success: false,
                    data: null,
                    message: "Product quntity required"
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

        const item = new AddToCart({
            product: product._id,
            quntity
        })

        await item.save()

        if (!item) {
            return res.status(500)
                .json({
                    success: false,
                    data: null,
                    message: "Internal Server Error"
                })
        }

        res.status(201)
            .json({
                success: true,
                data: item,
                message: "Item Create Successfully"
            })

    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllItems = async(req, res) => {
    const items = await AddToCart.find().populate("product", "title prise productImage")

    return res.status(200)
        .json({
            success: true,
            data: items,
            message: "All Items Fetched Successfully"
        })
}

const removeItem = async (req, res) => {
  try {
      const { productId } = req.params
  
      if (!productId) {
          return res.status(400)
              .json({
                  success: false,
                  data: null,
                  message: "Product id required"
              })
      }
  
      const removedItem = await AddToCart.findOneAndDelete(
          {product: productId},
          {new: true}
      )
  
      if (!removedItem) {
          return res.status(404)
              .json({
                  success: false,
                  data: null,
                  message: "Product not found"
              })
      }
  
      res.status(200)
          .json({
              success: true,
              data: removedItem,
              message: "Product Remove Successfully"
          })
  } catch (error) {
    throw new Error(error.message)
  }
}

export { addItem,
    getAllItems,
    removeItem

 }