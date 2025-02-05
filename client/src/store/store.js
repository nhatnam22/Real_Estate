import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '@/store/usersSlice';
import authSlice from '@/store/authSlice';


const store = configureStore({
    reducer: {
        userInfo: usersSlice,
        auth: authSlice,
    },
});

export { store };
