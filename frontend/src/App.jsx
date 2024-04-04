import logo from "./logo.svg";
import "./App.css";

import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";

import Home from "./pages/home/index"; //
import Sign from "./pages/sign/index";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./store/slice/count";
// useSelector 作用就是去读取store中的state值的辅助函数
// useDispatch 作用就是去调用slice中reducers中的函数去改变全局状态
function App() {
  const value = useSelector((state) => state.count.value);

  const dispatch = useDispatch();

  return (
    <div className="App">
    </div>
  );
}


export default App;
