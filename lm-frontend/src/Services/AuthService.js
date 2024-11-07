import axios from "axios"

const AUTH_REST_API_BASE_URL = 'http://localhost:8080/api/auth'

export const loginAPICALL = (usernameOrEmail, password) => axios.post(AUTH_REST_API_BASE_URL + '/login', { usernameOrEmail, password })

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj)

export const changePasswordAPICall = (obj) => axios.post(AUTH_REST_API_BASE_URL + '/change-password', obj)

export const resetPasswordAPICall = (obj) => axios.post(AUTH_REST_API_BASE_URL + '/reset-password', obj)

export const storeToken = (token) => {
    localStorage.setItem("token", token)
}

export const getToken = () => {
    return localStorage.getItem("token")
}

export const saveLoggedInUser = (username, role, userId) => {
    sessionStorage.setItem("authenticatedUser", username)
    sessionStorage.setItem("role", role)
    sessionStorage.setItem("userId", userId)
}

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser")
    if (username == null) {
        return false
    } else {
        return true
    }
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser")
    return username
}

export const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
}

export const isAdminUser = () => {

    let role = sessionStorage.getItem("role")
    if (role != null && role === 'ROLE_ADMIN') {
        return true
    } else {
        return false
    }

}

export const getUserId = () => {
    return sessionStorage.getItem("userId")
}
