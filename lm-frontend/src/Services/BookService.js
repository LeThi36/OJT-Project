import axios from "axios"

const BOOK_REST_API_BASE_URL = 'http://localhost:8080/api/book'

export const countBook = () => axios.get(BOOK_REST_API_BASE_URL + '/count')

export const getAllBook = (pageNo, pageSize) => axios.get(BOOK_REST_API_BASE_URL, {
    params: {
        pageNo: pageNo,
        pageSize: pageSize
    }
})

export const deleteBook = (id) => axios.delete(BOOK_REST_API_BASE_URL + "/" + id)

export const getBookById = (id) => axios.get(BOOK_REST_API_BASE_URL + "/" + id)

export const addNewBook = (formData) => {
    return axios.post(BOOK_REST_API_BASE_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const searchBook = (categoryId, authorId, content, pageNo, pageSize) => axios.get(BOOK_REST_API_BASE_URL + '/search', {
    params: {
        categoryId: categoryId,
        authorId: authorId,
        content: content,
        pageNo: pageNo,
        pageSize: pageSize
    }
})

export const updateBook = (book, id) => axios.put(BOOK_REST_API_BASE_URL + '/' + id, book)

export const updateBookImage = (formData, id) => axios.put(BOOK_REST_API_BASE_URL + '/updateImage/' + id, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})