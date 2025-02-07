import { Router } from 'express'
import { addItem, getAllItems, removeItem, updateItemInCart } from '../controller/addToCart.controller.js'

const router = Router()

router.route("/").get(getAllItems)
router.route("/products/:productId").post(addItem)
router.route("/:itemId")
    .delete(removeItem)
    .patch(updateItemInCart)
   


export default router