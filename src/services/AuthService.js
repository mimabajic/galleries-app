import { httpService } from "./HttpService";
class AuthService {
  constructor() {
    this.axiosInstance = httpService.axiosInstance;
    this.authorizationHeader = httpService.setAxiosAuthorizationHeader;
  }
  async register(data) {
    try {
      const response = await this.axiosInstance.post("/register", data);
      localStorage.setItem("token", response.data.authorisation.token);
      this.authorizationHeader(response.data.authorisation.token);
      return response;
    } catch {
      console.error("Register error");
    }
  }
  async login(data) {
    try {
      const response = await this.axiosInstance.post("/login", data);
      localStorage.setItem("token", response.data.authorisation.token);
      this.authorizationHeader(response.data.authorisation.token);
      return response;
    } catch {
      console.error("Login error");
    }
  }
  async logout(data){
    try{
      const response = await this.axiosInstance.post("/logout", data);
      this.setAxiosAuthorizationHeader('');
  
      return response;
    }catch{
      console.error("Logout error");
    }
  }
  async getAll() {
    try{
      const response = await this.axiosInstance.get("/authors");
      return response.data;
    }catch{
      console.error("get all error");
    }
  }}
export const authService = new AuthService();