import axios from "axios";
<<<<<<< HEAD
const BASE_URL = 'http://localhost:8000'

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate =  axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
=======

export default axios.create({
    baseURL: 'http://localhost:8000'
>>>>>>> parent of e3be92d (Revert "Merge branch 'client' into main")
});