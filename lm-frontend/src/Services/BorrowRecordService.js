import axios from "axios"

const BORROW_REST_API_URL = 'http://localhost:8080/api/borrow'

export const getAllBorrowRecord = () => axios.get(BORROW_REST_API_URL)

export const createBorrowRecord = (borrowRecord) => axios.post(BORROW_REST_API_URL + '/create', borrowRecord);

export const approveBorrowRecord = (borrowId) => axios.put(BORROW_REST_API_URL + `/approve/${borrowId}`);

export const deleteBorrowRecord = (borrowId) => axios.delete(BORROW_REST_API_URL + `/delete/${borrowId}`);