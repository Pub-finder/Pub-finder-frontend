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
      const { userId, username, accessToken, refreshToken } = action.payload;
      console.log("action.payload: ", action.payload);
      // Store data in localStorage and cookies
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("accessToken", accessToken);
      Cookies.set('refresher-cookie', refreshToken, { expires: 1 })

      // Update state to reflect authentication status
      state.authenticated = true;
      console.log(`User ${userId} has been authenticated`);
    },
    signout(state, action) {
      // Delete data in localStorage and cookies
      let userId = localStorage.getItem("userId");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("accessToken");
      Cookies.remove('refresher-cookie');

      // Update state to reflect authentication status
      state.authenticated = false;
      console.log(`User ${userId} has been signed out`);
    },
  },
});

export const { setCredentials, signout } = authSlice.actions;

export default authSlice.reducer;
