import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

import { removeUserInfo, saveUserInfo } from "../../store/slice/user";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PROFILE } from "../../services/user";

import "./index.css";

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userReducer.userInfo);

  const [isEdit, setIsEdit] = useState(false); // 默认非编辑状态

  const { firstName, lastName, userName } = userInfo;

  const [_userName, set_userName] = useState(userName);

  const checkLogin = () => {
    if (!firstName || !lastName || !userName) {
      return navigate("/sign");
    }
  };

  const onSignOut = () => {
    dispatch(removeUserInfo());
    navigate("/sign");
  };

  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSave = async () => {
    console.log("Final submitted userName", _userName);
    const res = await UPDATE_PROFILE({ userName: _userName });
    // OK
    alert("edit successfully ");
    setIsEdit(false);

    //将 res 传递给 saveUserInfo 函数来更新 Redux 中的用户信息
    console.log("saveUserInfo", res);
    dispatch(saveUserInfo(res)); 
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <Header>
        <span className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          {userName}
        </span>
        <span className="main-nav-item" onClick={onSignOut}>
          <i className="fa fa-sign-out"></i>
          Sign Out
        </span>
      </Header>
      <main className="main bg-dark">
        {(isEdit && (
          <div className="edit">
            <h1>Edit user info</h1>
            <form>
              <div className="form-item">
                <label htmlFor="userName">userName</label>
                <input
                  name="userName"
                  type="text"
                  value={_userName}
                  onInput={(e) => set_userName(e.target.value)}
                />
              </div>
              <div className="form-item">
                <label htmlFor="firstName">firstName</label>
                <input
                  name="firstName"
                  type="text"
                  value={firstName}
                  disabled
                />
              </div>
              <div className="form-item">
                <label htmlFor="lastName">lastName</label>
                <input name="lastName" type="text" value={lastName} disabled />
              </div>
            </form>
            <div className="operation">
              <button className="edit-button" onClick={onSave}>
                Save
              </button>
              <button className="edit-button" onClick={onEdit}>
                Cancel
              </button>
            </div>
          </div>
        )) || (
          <div className="header">
            <h1>
              Welcome back
              <br />
              {`${firstName} ${lastName}`}!
            </h1>
            <button className="edit-button" onClick={onEdit}>
              Edit Name
            </button>
          </div>
        )}

        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}
