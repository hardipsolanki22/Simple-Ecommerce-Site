import axios from "axios";

// const baseURL = "http://localhost:8080/api/v1"
const baseURL = "https://simple-ecommerce-site-api.onrender.com/api/v1"

const axiosInstance = axios.create({
        baseURL
    })

export {axiosInstance}
