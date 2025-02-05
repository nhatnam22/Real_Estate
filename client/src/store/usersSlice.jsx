import { GetCurrentRequest } from '@/api/GetCurrentRequest';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  current: null,
  roles: [],
  image: null,
  phone: null,
  error: null,
  loading: false
}

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetCurrentRequest();
      if (response.status === "OK") {
        console.log(response.data)
        return response.data;
      } else {
        throw new Error('Failed to fetch current user');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { username, roles, image, email, phone } = action.payload;
      state.current = username;
      state.roles = roles;
      state.image = image;
      state.email = email;
      state.phone = phone;
      state.isLoggedIn = true;
      sessionStorage.setItem(
        'userInfo',
        JSON.stringify({ username, roles, image, email })
      )
    },
    clearUser: (state) => {
      state.current = null;
      state.roles = null;
      state.image = null;
      state.email = null;
      state.phone = null;
      sessionStorage.removeItem('userInfo')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.username;
        state.roles = action.payload.roles;
        state.image = action.payload.image;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        sessionStorage.setItem(
          'userInfo',
          JSON.stringify({ image:action.payload.image, email:action.payload.email, name: action.payload.username, phone : action.payload.phone })
      );
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { setUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;