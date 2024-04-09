import React, { Component, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import argentBankLogo from "../../assets/argentBankLogo.webp";
import { UPDATE_PROFILE, GET_PROFILE } from "../../services/user";
import { removeUserInfo, saveUserInfo } from "../../store/slice/user";

export default function Header(props) {
  const { userClick } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  // Header是每个页面都在引入的组件
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const { userName = "" } = userInfo;

  const nav2Sign = () => {
    navigate("/sign");
  };

  const onSignOut = () => {
    dispatch(removeUserInfo());
    navigate("/sign");
  };

  const getUserInfo = async () => {
    const res = await GET_PROFILE();
    // 存储到redux
    dispatch(saveUserInfo(res));
  };

  const checkLogin = () => {
    if (!localStorage.getItem("token")) {
      if (location.pathname === "/home") return;
      return navigate("/sign");
    }
    getUserInfo();
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/home">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="right">
        {userName ? (
          <>
            <span className="main-nav-item" onClick={userClick}>
              <i className="fa fa-user-circle"></i>
              {userName}
            </span>
            <span className="main-nav-item" onClick={onSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </span>
          </>
        ) : (
          <span className="main-nav-item" onClick={nav2Sign}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </span>
        )}
      </div>
    </nav>
  );
}
