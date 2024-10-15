import axios from "axios"

const PUBLISHER_BASE_REST_API_URL = 'http://localhost:8080/api/publisher'

export const getAllPublisher = () => axios.get(PUBLISHER_BASE_REST_API_URL)