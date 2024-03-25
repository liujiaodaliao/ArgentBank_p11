import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, HashRouter } from "react-router-dom";
import store from "./store/index";
import { Provider } from "react-redux";

import { Routes, Route, Outlet, Link, createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/index";
import Sign from "./pages/sign/index";

import router from "./routers/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <HashRouter>
//         <App></App>
//       </HashRouter>
//     </Provider>
//   </React.StrictMode>
// );

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App></App> */}
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
