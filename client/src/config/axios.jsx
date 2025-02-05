import axios from 'axios';

// Tạo instance Axios
const instance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, // Gửi cookie cùng request
});

// Interceptor cho Request: Đính kèm accessToken vào Header
instance.interceptors.request.use(
    (config) => {
        // Lấy accessToken từ sessionStorage
        const token = sessionStorage.getItem('accessToken');

        if (token) {
            try {
                // Đặt accessToken vào Authorization header
                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error('Error setting Authorization header:', error);
            }
        } else {
            console.warn('No access token found in sessionStorage');
        }

        return config;
    },
    (error) => {
        // Xử lý lỗi khi gửi request
        return Promise.reject(error);
    }
);

// Interceptor cho Response: Xử lý lỗi và tự động làm mới token
instance.interceptors.response.use(
    (response) => {
        // Trả về dữ liệu nếu không có lỗi
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là 401 và không phải là request làm mới token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Đánh dấu để tránh lặp vô hạn

            try {
                // Gửi request làm mới token
                const refreshResponse = await axios.post(
                    'http://localhost:8080/auth/users/get-refresh-token',
                    {}, // Payload rỗng
                    { withCredentials: true } // Gửi cookie chứa refreshToken
                );

                const { accessToken } = refreshResponse.data;

                // Lưu accessToken mới vào sessionStorage
                sessionStorage.setItem('accessToken', accessToken);

                // Thêm token mới vào request ban đầu
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // Gửi lại request ban đầu
                return instance(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                sessionStorage.removeItem('accessToken'); // Xóa token cũ
                document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Xóa cookie

                // Điều hướng người dùng đến trang đăng nhập
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Nếu không phải lỗi 401 hoặc không làm mới được token, trả lỗi về
        return Promise.reject(error);
    }
);

export default instance;
