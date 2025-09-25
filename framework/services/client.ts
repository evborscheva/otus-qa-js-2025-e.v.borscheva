import axios from 'axios';
import config from '../config/configBookstore';

const client = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: () => true
});

export default client;
