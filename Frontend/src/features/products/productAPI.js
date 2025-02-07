import { axiosInstance } from '../../helpers/axiosService'

export const fetchProducts = () => {
    return axiosInstance.get("/products/")
}

export const addProduct = (formData) => {
    return axiosInstance.post("/products/", formData)
}