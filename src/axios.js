import axios from 'axios';
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/api/v1' 
: 'https://stormy-forest-22894.herokuapp.com/api/v1' 
const instance = axios.create({baseURL});

export default instance;