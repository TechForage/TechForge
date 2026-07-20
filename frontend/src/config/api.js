import axios from "axios";

const api = axios.create({
  baseURL: "https://techforge-vzi6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;