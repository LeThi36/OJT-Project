import axios from "axios";

const BASE_API_RESET_PASSWORD_URL = 'http://localhost:8080/api/token'

export const resetPasswordRequest = (email) => axios.post(BASE_API_RESET_PASSWORD_URL + '/forgotPassword', email)
export const verifyToken = (token) => axios.get(BASE_API_RESET_PASSWORD_URL + '/' + token)
export const getResetPasswordToken = (token) => axios.get(BASE_API_RESET_PASSWORD_URL + '/getToken/' + token)