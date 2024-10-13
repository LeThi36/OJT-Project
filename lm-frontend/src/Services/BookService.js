import axios from "axios"

const BOOK_REST_API_BASE_URL = 'http://localhost:8080/api/book'

export const countBook = ()=>axios.get(BOOK_REST_API_BASE_URL+'/count')