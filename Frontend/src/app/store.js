import {configureStore} from '@reduxjs/toolkit'
import productSlice from '../features/products/productSlice'
import cartSlice from '../features/cart/cartSlice'

export const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice
    }
})