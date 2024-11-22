import axios from "axios"

const AUTHOR_REST_API_BASE_URL = 'http://localhost:8080/api/author'

export const countAuthor = () => axios.get(AUTHOR_REST_API_BASE_URL + '/count')

export const getAllAuthor = (pageNo, pageSize) => axios.get(AUTHOR_REST_API_BASE_URL, {
    params: {
        pageNo: pageNo,
        pageSize: pageSize
    }
})

export const getAuthorById = (id) => axios.get(AUTHOR_REST_API_BASE_URL + '/' + id)

export const deleteAuthorById = (id) => axios.delete(AUTHOR_REST_API_BASE_URL + '/' + id)

