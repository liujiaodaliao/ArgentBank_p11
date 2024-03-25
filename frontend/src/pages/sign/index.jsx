import React, { Component, useState, useRef, useEffect } from "react";
import Card from "../../components/Card";

import Header from "../../components/Header";
import { LOGIN, GET_PROFILE } from "../../services/user";
import { useNavigate } from "react-router-dom";

import { saveUserInfo } from "../../store/slice/user";
import { useDispatch } from "react-redux";

/**
 * step1 收集表单数据
 * step2 表单验证
 * step3 把表单数据提交给后台
 */
export default function Sign() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [username, setUsername] = useState("tony@stark.com");
  const [password, setPassword] = useState("password123");
  const [remember, setRemember] = useState(false);

  const usernameRef = useRef(); // ref.currrent === document.getElementBy.... 一致的, 原生取表单数据用的是value属性。注意checkbox，radio 需要用checked去获取勾选状态

  useEffect(() => {
    // 将焦点移动到用户名输入框上
    usernameRef.current.focus();
  }, []);

  const onDetail = (params) => {
    alert(`nav to detail page ${params}`);
  };

  const formValidate = () => {
    if (!username) {
      alert("username is required");
      return false;
    }
    if (!password) {
      alert("password is required");
      return false;
    }
    return true;
  };

  const getUserInfo = async () => {
    const res = await GET_PROFILE();
    console.log("getuserinfo", res);
    // 存储到redux
    dispatch(saveUserInfo(res));
  };

  const handleSignIn = async () => {
    const isValid = formValidate();
    if (!isValid) return;

    console.log(username, password, remember);
    const options = {
      email: username,
      password,
    };

    // ajax request
    const res = await LOGIN(options);
    // 存token 跳转user页面
    localStorage.setItem("token", res.token);
    await getUserInfo();
    navigate("/user");
  };

  return (
    <div>
      <Header>
        <span className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </span>
      </Header>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                ref={usernameRef}
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                value={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <span className="sign-in-button" onClick={handleSignIn}>
              Sign In
            </span>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}
