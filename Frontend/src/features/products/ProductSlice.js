import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { addProduct, fetchProducts } from './productAPI'

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = fetchProducts();
        return response.data
    }
)

export const addProductAsync = createAsyncThunk(
    "products/addProduct",
    async (formData) => {
        const response = addProduct(formData);
        return response.data
    }
)

const initialState = {
    products: [],
    status: "init"
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state, action) => {
            state.status = "loading";
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.status = "idle",
            products = action.payload
            
        })
        builder.addCase(addProductAsync.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })
        builder.addCase(addProductAsync.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(addProductAsync.rejected, (state, action) => {
            state.status = "idle"
            state.erro = action.error.message
        })
    }
})

export const {} = productSlice.actions

export default productSlice.reducer