import { initialAbility } from "@/libs/acl/config";
import useJwt from "@/auth/jwt/useJwt";
import axios from "axios";

// Lấy token từ localStorage
const getToken = () => localStorage.getItem("access_token");

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Đặt URL gốc của API
  headers: {
    "Content-Type": "application/json", // Đặt header mặc định
  },
});

// Thêm interceptor để tự động thêm token
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý lỗi trong response
axiosInstance.interceptors.response.use(
  (response) => response, // Trả về response nếu thành công
  (error) => {
    if (error.response && error.response.status === 403) {
      console.log("403 Forbidden - Logging out");
      logout(); // Gọi hàm logout khi gặp lỗi 403
    }
    return Promise.reject(error); // Trả về lỗi cho các xử lý tiếp theo
  }
);
function logout() {
  // Remove userData from localStorage
  // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
  localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName);
  localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);

  // Remove userData from localStorage
  localStorage.removeItem("userData");

  // Reset ability
  this.$ability.update(initialAbility);

  // Redirect to login page
  this.$router.push({ name: "auth-login" });
}

export default axiosInstance;
