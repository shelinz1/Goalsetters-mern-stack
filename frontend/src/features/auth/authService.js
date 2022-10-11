import axios from "axios";

const API_URL = "/api/users/";

//register user
const register = async (name, email, password) => {
  const response = await axios.post(API_URL, {
    name,
    email,
    password,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login user
const login = async (email, password) => {
  const response = await axios.post(API_URL + "login", {
    email,
    password,
  });
  
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
