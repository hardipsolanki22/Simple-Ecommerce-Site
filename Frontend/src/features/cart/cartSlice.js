import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosInstance } from '../../helpers/axiosService';

const initialState = {
    items: [],
    status: "idle"
}

export const fetchItemsAsync = createAsyncThunk(
    "cart/fetchItems",
    async() => {
        try {            
            const response = await axiosInstance.get('/add-to-cart/')            
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async(productId) => {
        try {
            const response = await axiosInstance.post(`/add-to-cart/products/${productId}`, {quntity: 1})
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const removeItemAsync = createAsyncThunk(
    "cart/removeItems",
    async(itemId) => {    
        try {
            const response = await axiosInstance.delete(`/add-to-cart/${itemId}`)
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const updateItemAsync = createAsyncThunk(
    "cart/updateItem",
    async({itemId, quntity}) => {
        try {
            const response = await axiosInstance.patch(`/add-to-cart/${itemId}`, {quntity: quntity})            
            return response.data.data

        } catch (error) {   
            console.log(error);
            
        }
    }
)

const cartSlice = createSlice({
    name: "items",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // fetch items
        builder.addCase(fetchItemsAsync.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(fetchItemsAsync.fulfilled, (state, action) => {
            state.status = "idle",
            state.items = action.payload
            console.log("action: ", action.payload);
            
        })
        builder.addCase(fetchItemsAsync.rejected, (state, action) => {
            state.status = "fails",
            state.error = action.error.message
        })

        // add items
        builder.addCase(addToCartAsync.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(addToCartAsync.fulfilled, (state, action) => {
            state.status = "idle"
        })
        builder.addCase(addToCartAsync.rejected, (state, action) => {
            state.status = "fails",
            state.error = action.error.message
        })

        // remove items
        builder.addCase(removeItemAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(removeItemAsync.fulfilled, (state, action) => {
            state.status = "idle"
            const itemIndex = state.items.findIndex(item => item._id === action.payload._id)
            state.items.splice(itemIndex, 1)
        })
        builder.addCase(removeItemAsync.rejected, (state, action) => {
            state.status = "fail"
            state.error = action.error.message
        })

        // update item
        builder.addCase(updateItemAsync.fulfilled, (state, action) => {
            state.status = "idle"
            const itemIndex = state.items.findIndex(item => item._id === action.payload._id)
            state.items.splice(itemIndex, 1,action.payload )

        })

    }
})

export const {} = cartSlice.actions

export default cartSlice.reducer