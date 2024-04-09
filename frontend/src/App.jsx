import React, { Component, useEffect } from "react";
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import { GET_PROFILE } from "./services/user";
import Home from "./pages/home/index";
import { useSelector, useDispatch } from "react-redux";
// useSelector 作用就是去读取store中的state值的辅助函数
// useDispatch 作用就是去调用slice中reducers中的函数去改变全局状态
function App() {
  const dispatch = useDispatch();
  const getUserInfo = async () => {
    const res = await GET_PROFILE();
    console.log("getuserinfo", res);
    // 存储到redux
    dispatch(saveUserInfo(res));
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
