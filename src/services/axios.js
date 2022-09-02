import axios from 'axios';
import { getItem } from '../utils/storage';


export default axios.create({
  baseURL: 'http://localhost:3334',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
