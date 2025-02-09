import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../helpers/axiosService'

const initialState = {
    products: [],
    status: "idle"
}

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const response = await axiosInstance.get("/products/")            
            return response.data.data

        } catch (error) {
            console.log(error);
        }
    }
)

export const addProductAsync = createAsyncThunk(
    "products/addProduct",
    async (formData) => {
        try {
            const response = await axiosInstance.post("/products/", formData)
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        // fetch products
        builder.addCase(fetchProductsAsync.pending, (state, action) => {
            state.status = "loading";
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.status = "idle",
            state.products = action.payload

        })

        // add products
        builder.addCase(addProductAsync.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(addProductAsync.fulfilled, (state, action) => {
             state.products.push(action.payload)
            state.status = "idle"
        })
    }
})

export const { } = productSlice.actions

export default productSlice.reducer