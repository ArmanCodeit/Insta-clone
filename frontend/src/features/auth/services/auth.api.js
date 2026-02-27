import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true
});

export async function register(username, email, password) {
  try {
    const response = await api.post("/register", {
      username: username,
      email: email,
      password: password
    });

    return response.data;
  } 
  catch (err) {
    throw err.response?.data || err.message;
  }
}

export async function login(username, password) {
  try {
    const response = await api.post("/login", {
      username: username,
      password: password
    });

    return response.data;
  }
  catch (err) {
    throw err.response?.data || err.message;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/get-me"); 
    return response.data;
  }
  catch (err) {
    throw err.response?.data || err.message;
  }
}