import axios from "axios";

const API_URL = "http://localhost:4000/user/";

class LoginService {
  
    login(username, password,role) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
        role
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data.user;
      });
      
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname,lastname,gender,email,username,password) {
    return axios.post(API_URL + "signup", {
      firstname,
      lastname,
      gender,
      email,
      username,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new LoginService();