import axios from "axios"

const BOOKREVIEW_REST_API_BASE_URL = 'http://localhost:8080/api/review'

export const getBookReviewByBookId = (id) => axios.get(BOOKREVIEW_REST_API_BASE_URL + '/book/' + id)

export const postBookReview = (bookReview) => axios.post(BOOKREVIEW_REST_API_BASE_URL, bookReview)