
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null,
    refreshtoken: null,
    error: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { token, refreshtoken } = action.payload;
            state.token = token;
            state.refreshtoken = refreshtoken;
            state.isLoggedIn = true;
            // Lưu accessToken vào sessionStorage
            sessionStorage.setItem('accessToken', token);
            // Lưu refreshToken vào cookies (sử dụng thư viện như js-cookie)
            document.cookie = `refreshToken=${refreshtoken}; Secure; Path=/;`;
        },
        logout: (state) => {
            state.token = null;
            state.refreshtoken = null;
            state.isLoggedIn = false;
            // Xóa accessToken khỏi sessionStorage
            sessionStorage.removeItem('accessToken');
            // Xóa refreshToken khỏi cookies
            document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;