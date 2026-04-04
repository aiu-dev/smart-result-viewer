import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://smart-result-viewer.onrender.com";

export const API = axios.create({
  baseURL: BASE_URL,
});
