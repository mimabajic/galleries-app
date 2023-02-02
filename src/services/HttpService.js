import axios from "axios";

class HttpService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
    });
    this.setAxiosAuthorizationHeader();
  }

  setAxiosAuthorizationHeader(tokenParam = null) {
    let token = tokenParam ? tokenParam : localStorage.getItem("token");
    if (token) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }
}

export const httpService = new HttpService();