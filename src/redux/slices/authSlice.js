import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
        console.log(action.payload.response)
      const { userId, accessToken, refreshToken } = action.payload.response
      localStorage.setItem("user", userId);
      localStorage.setItem("accessToken", accessToken);
      Cookies.set('refresher-cookie', refreshToken, { expires: 1 })
    },
    signout(state, action) {
      localStorage.clear();
      Cookies.remove('refresher-cookie')
    },
    getUser(state, action) {
      return state.user
    }
  },
});

export const { setCredentials, signout, getUser } = authSlice.actions;

export default authSlice.reducer;
