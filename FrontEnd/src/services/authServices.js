import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", { username, password })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  register(username, password,name,address,phoneNumber) {
   return axios
    .post(API_URL + "customer/add", {
      username,
      password,
      name,
      address,
      phoneNumber
    })
  }

  logout() {
    localStorage.removeItem("user");
  }

}

export default new AuthService();