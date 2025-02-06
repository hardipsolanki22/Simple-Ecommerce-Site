import { Router } from 'express'
import { addItem, getAllItems, removeItem } from '../controller/addToCart.controller.js'

const router = Router()

router.route("/").get(getAllItems)
router.route("/products/:productId")
    .post(addItem)
    .delete(removeItem)


export default router