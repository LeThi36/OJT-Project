import axios from "axios"

const CATEGORY_REST_API_BASE_URL = 'http://localhost:8080/api/category'

export const getAllCategory = () => axios.get(CATEGORY_REST_API_BASE_URL)

export const getCategoryById = (id) => axios.get(CATEGORY_REST_API_BASE_URL + '/' + id)

export const countCategory = () => axios.get(CATEGORY_REST_API_BASE_URL + '/count')