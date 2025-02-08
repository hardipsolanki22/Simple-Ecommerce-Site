import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    status: "idle"
}

const fetchItems = createAsyncThunk(
    "cart/fetchItems",
    async(productId, quantity) => {
        try {
            const response = await axiosInstance.get('/add-to-cart/')
            return response.data.data
        } catch (error) {
            console.log("message: ", error.response.data.message);
            console.log("error: ", error.message);
        }
    }
)

const addToCart = createAsyncThunk(
    "cart/addToCart",
    async(productId, quantity) => {
        try {
            const response = await axiosInstance.post(`/add-to-cart/products/${productId}`, quantity)
            return response.data.data
        } catch (error) {
            console.log("message: ", error.response.data.message);
            console.log("error: ", error.message);
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.status = "idle",
            state.cart = action.payload
        })
        builder.addCase(fetchItems.rejected, (state, action) => {
            state.status = "fails",
            state.error = action.error.message
        })
        builder.addCase(addToCart.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.status = "idle",
            state.cart.push(action.payload)
        })
        builder.addCase(addToCart.rejected, (state, action) => {
            state.status = "fails",
            state.error = action.error.message
        })
    }
})

export const {} = cartSlice.actions

export default cartSlice.reducer