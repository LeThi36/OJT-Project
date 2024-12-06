import axios from "axios"

const BORROW_REST_API_URL = 'http://localhost:8080/api/borrow'

export const getAllBorrowRecord = (pageNo,pageSize) => axios.get(BORROW_REST_API_URL,{
    params: {
        pageNo: pageNo,
        pageSize: pageSize
    }
})

export const createBorrowRecord = (borrowRecord) => axios.post(BORROW_REST_API_URL + '/create', borrowRecord);

export const approveBorrowRecord = (borrowId) => axios.put(BORROW_REST_API_URL + `/approve/${borrowId}`);

export const deleteBorrowRecord = (borrowId) => axios.delete(BORROW_REST_API_URL + `/delete/${borrowId}`);

export const createBorrowRecordMultiple = (borrowRecords) => axios.post(BORROW_REST_API_URL + '/create/multiple', borrowRecords);

export const returnBorrowedBook = (borrowId) => axios.put(BORROW_REST_API_URL + `/return/${borrowId}`);

export const countBorrowedRecord = () => axios.get(BORROW_REST_API_URL + '/count')

export const countPendingBorrowRecord = () => axios.get(BORROW_REST_API_URL + '/count/pending')

export const countRecord = () => axios.get(BORROW_REST_API_URL + '/count/record')

