import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  // 初始状态
  initialState: {
    userInfo: {},
  },
  // 去更改state值的函数集合
  reducers: {
    saveUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
    removeUserInfo(state, { payload }) {
      localStorage.removeItem("token");
      state.userInfo = {};
    },
  },
});

export const { saveUserInfo, removeUserInfo } = userSlice.actions; // reducers里面有多少函数这里要用的话就都需要导出

export default userSlice.reducer;
