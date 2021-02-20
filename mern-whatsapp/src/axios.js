import axios from 'axios'

//axios basically is, is a url endpoint fetcher
const instance = axios.create({
    baseURL: 'http://localhost:9000'
})

export default instance;