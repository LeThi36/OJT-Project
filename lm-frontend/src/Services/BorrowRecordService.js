import axios from "axios"

const BORROW_REST_API_URL = 'http://localhost:8080/api/borrow'

export const getAllBorrowRecord = () => axios.get(BORROW_REST_API_URL)