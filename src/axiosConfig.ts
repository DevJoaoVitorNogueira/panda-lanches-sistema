import axios from "axios";

const api = axios.create({
  baseURL: "https://api.pandalanches.com.br/",
});

export default api;
