import {configureStore} from '@reduxjs/toolkit'
import productSlice from '../features/products/ProductSlice.js'
import cartSlice from '../features/cart/cartSlice.js'

export const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice
    }
})