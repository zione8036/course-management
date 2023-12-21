import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api/v1/",
});

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.statusCodeValue >= 400 &&
    error.response.statusCodeValue < 500;

  if (!expectedError) {
    console.error(error);
    alert("An unexpected error occurred");
  }
  return Promise.reject(error);
});

export default http;
