import axios from "axios"

const AUTHOR_REST_API_BASE_URL = 'http://localhost:8080/api/author'

export const countAuthor = () => axios.get(AUTHOR_REST_API_BASE_URL+'/count')