import { Router } from "express"
import { createProduct, 
        deleteProduct, 
        getAllProducts, 
        getProduct, 
         updateProductField } from "../controller/products.controller.js"
import { upload } from "../middleware/multer.js"


// MVC Model-View-Controoler

const router = Router()

router.route('/')
        .post( upload.single("productImage") , createProduct )
        .get(getAllProducts)
router.route('/:productId')
        .get(getProduct)   
        .patch(updateProductField )
        .delete(deleteProduct )

export default router