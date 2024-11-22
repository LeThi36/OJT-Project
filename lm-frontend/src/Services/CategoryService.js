import axios from "axios"

const CATEGORY_REST_API_BASE_URL = 'http://localhost:8080/api/category'

export const getAllCategory = (pageNo, pageSize) => axios.get(CATEGORY_REST_API_BASE_URL, {
    params: {
        pageNo: pageNo,
        pageSize: pageSize
    }
})

export const getCategoryById = (id) => axios.get(CATEGORY_REST_API_BASE_URL + '/' + id)

export const countCategory = () => axios.get(CATEGORY_REST_API_BASE_URL + '/count')

export const deleteCategoryById = (id) => axios.delete(CATEGORY_REST_API_BASE_URL + '/' + id)