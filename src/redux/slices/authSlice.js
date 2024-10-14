import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
  authenticated: Boolean(localStorage.getItem("userId")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { userId, accessToken, refreshToken } = action.payload.response
      localStorage.setItem("userId", userId);
      localStorage.setItem("accessToken", accessToken);
      Cookies.set('refresher-cookie', refreshToken, { expires: 1 })
      state.authenticated = true;
    },
    signout(state, action) {
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      Cookies.remove('refresher-cookie');
      state.authenticated = false;
    },
  },
});

export const { setCredentials, signout } = authSlice.actions;

export default authSlice.reducer;
