import axios from "axios"

const BOOKREVIEW_REST_API_BASE_URL = 'http://localhost:8080/api/review'

export const getBookReviewByBookId = (id, pageNo, pageSize) => axios.get(BOOKREVIEW_REST_API_BASE_URL + '/book/' + id, {
    params: {
        pageNo: pageNo,
        pageSize: pageSize
    }
})

export const postBookReview = (bookReview) => axios.post(BOOKREVIEW_REST_API_BASE_URL, bookReview)

export const countBookReviewById = (id) => axios.get(BOOKREVIEW_REST_API_BASE_URL + '/count/' + id)

export const deleteBookReviewById = (id) => axios.delete(BOOKREVIEW_REST_API_BASE_URL + '/' + id)