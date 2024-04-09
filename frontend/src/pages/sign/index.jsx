import React, { Component, useState, useRef, useEffect } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); //trie

  const usernameRef = useRef();
  // ref.currrent === document.getElementBy.... 一致的,
  //原生取表单数据用的是value属性。注意checkbox，radio 需要用checked去获取勾选状态

  useEffect(() => {
    // 将焦点移动到用户名输入框上
    usernameRef.current.focus();
  }, []);

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

      // 存token options跳转user页面
      localStorage.setItem("token", res.token);
      saveOptions(options);

      await getUserInfo();
      navigate("/user");
  };

  const saveOptions = (options) => {
    if (remember) {
      const { email, password } = options;
      const _ = { email: btoa(email), password: btoa(password) };
      const local = JSON.stringify(_);
      console.log(local, typeof local);
      localStorage.setItem("options", local);
    } else {
      localStorage.removeItem("options");
    }
  };

  const getUserInfo = async () => {
    const res = await GET_PROFILE();
    console.log("getuserinfo", res);
    // 存储到redux
    dispatch(saveUserInfo(res));
  };

  const getOptions = () => {
    const options = localStorage.getItem("options");
    if (!options) return;
    return JSON.parse(options);
  };

  // 输入的同时 1保存email 2再对比localstorage中的email
  useEffect(() => {
    compareEmail();
  }, [username]);

  const compareEmail = () => {
    const local = getOptions();
    // console.log("实时输入的账号-->", username, "本地缓存的值", local);
    if (local && atob(local.email) === username) {
      // 自动填充密码
      setPassword(atob(local.password));
    }
  };

  // useEffect(() => {
  //   autoComplete();
  // }, []);
  // const autoComplete = () => {
  //   const local = getOptions();
  //   if (!local) return;
  //   setUsername(local.email);
  //   setPassword(local.password);
  // };

  return (
    <>
      <Header></Header>
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
                onInput={(e) => {
                  setUsername(e.target.value);
                }}
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
      <Footer />
    </>
  );
}
