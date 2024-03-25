import { createSlice } from "@reduxjs/toolkit";

export const countSlice = createSlice({
  name: "counter",
  // 初始状态
  initialState: {
    value: 0,
    a: 1,
    b: 2,
    c: 3,
  },
  // 去更改state值的函数集合
  reducers: {
    increment(state, { payload }) {
      state.value += payload;
    },
    decrement(state, { payload }) {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = countSlice.actions; // reducers里面有多少函数这里要用的话就都需要导出

export default countSlice.reducer;
