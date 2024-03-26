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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{value}</p>
        <button
          onClick={() => {
            dispatch(increment(3));
          }}
        >
          +
        </button>

        <button
          onClick={() => {
            dispatch(decrement({ test: 5 }));
          }}
        >
          -
        </button>
      </header> */}

      {/* <div className="router">
        <Link to="/home">home</Link>
        <Link to="/sign">sign</Link>
      </div> */}
      {/* 
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/sign" element={<Sign></Sign>}></Route>
      </Routes> */}
    </div>
  );
}


export default App;
