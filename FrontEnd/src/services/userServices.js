import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getCustomerContent() {
    return axios.get(API_URL + 'customer', { headers: authHeader() });
  }

  getEmployeeContent() {
    return axios.get(API_URL + 'employee', { headers: authHeader() });
  }

  getAdminContent() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();