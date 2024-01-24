import axios from "axios";
import { store } from "../store/store";

export const baseAPI = axios.create({
    baseURL: "https://job-dekho-backend.onrender.com/api/v1"
})

// Request

baseAPI.interceptors.request.use((config) => {  
    config.headers.authorization = `Bearer ${store.getState().user.accessToken}`
    return config
},
    (error) => {
        return Promise.reject(error)
    })

// Response

baseAPI.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)