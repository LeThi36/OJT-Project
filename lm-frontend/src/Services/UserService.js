import axios from "axios"
import { getToken } from "./AuthService"

const USER_REST_API_BASE_URL = 'http://localhost:8080/api/user'

axios.interceptors.request.use(function (config) {
    const token = getToken();

    if (token) {
        config.headers['Authorization'] = token;
    }

    console.log(token);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const getAllUser = () => axios.get(USER_REST_API_BASE_URL)

export const getUserById = (id) => axios.get(USER_REST_API_BASE_URL + '/' + id)