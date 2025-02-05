import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GetProfileGoogle } from '@/api/GetProfileGoogle';

const GoogleCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const queryParams = new URLSearchParams(location.search);
      const authorizationCode = queryParams.get('code');
      

      if (authorizationCode) {
        try {
          // Gọi hàm GetProfileGoogle với authorization code dưới dạng query params
          console.log(authorizationCode)
          const response = await GetProfileGoogle(authorizationCode);
          
          if (response && response.data) {
            console.log('Thông tin người dùng Google:', response.data);
            // Xử lý thông tin người dùng (lưu token, chuyển hướng, v.v.)
          }
        } catch (error) {
          console.error('Lỗi khi lấy thông tin từ Google:', error);
        }
      }
    };

    fetchProfile();
  }, [location]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default GoogleCallback;
