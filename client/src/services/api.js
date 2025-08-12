import axios from "axios";

export default axios.create({
  baseURL: process.env.React_PUBLIC_API_URL || "http://localhost:7001/api",
});
