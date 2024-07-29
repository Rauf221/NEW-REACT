
import axios from 'axios';

const API_URL = 'http://localhost:3001/customers'; // API URL'nizi buraya ekleyin

const getCustomers = () => {
  return axios.get(API_URL);
};

export default {
  getCustomers,
};
