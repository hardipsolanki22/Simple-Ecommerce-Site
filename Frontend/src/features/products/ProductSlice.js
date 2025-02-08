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
            console.log("data: ", JSON.stringify(response.data.data));
            
            return response.data.data

        } catch (error) {
            console.log("message: ", error.response.data.message);
            console.log("error: ", error.message);


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
            console.log("message: ", error.response.data.message);
            console.log("error: ", error.message);



        }
    }
)

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
            state.products = action.payload

        })
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