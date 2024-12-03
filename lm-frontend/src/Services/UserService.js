import axios from "axios"
import { getToken } from "./AuthService"

const USER_REST_API_BASE_URL = 'http://localhost:8080/api/user'

axios.interceptors.request.use(function (config) {
    const token = getToken();

    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const getAllUser = (pageNo, pageSize) => axios.get(USER_REST_API_BASE_URL, {
    params: {
        pageNo: pageNo,
        pageSize: pageSize
    }
})

export const getUserById = (id) => axios.get(USER_REST_API_BASE_URL + '/' + id)

export const userCount = () => axios.get(USER_REST_API_BASE_URL + '/count')

export const getUser = () => axios.get(USER_REST_API_BASE_URL + '/')

export const updateUser = (id, updatedUser) => axios.put(USER_REST_API_BASE_URL + '/' + id, updatedUser)

export const updateUserImage = (formData, id) => axios.post(USER_REST_API_BASE_URL + '/uploadToGoogleDrive/' + id, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})