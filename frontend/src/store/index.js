import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/user";

// configureStore 函数用于创建一个store仓库的
export default configureStore({
  reducer: {
    // key = useSelector去取值的时候的key
    userReducer,
  },
});
