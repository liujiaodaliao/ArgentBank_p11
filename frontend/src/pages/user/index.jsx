import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AccountCard from "../../components/AccountCard";

import { removeUserInfo, saveUserInfo } from "../../store/slice/user";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PROFILE, GET_PROFILE } from "../../services/user";
import { GET_ACCOUNTS } from "../../services/account";

import "./index.css";

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userReducer.userInfo);

  const [isEdit, setIsEdit] = useState(false); // 默认非编辑状态

  const { firstName, lastName, userName } = userInfo;

  const [_userName, set_userName] = useState(userName);

  const [accounts, setAccounts] = useState([]); // 存放账户信息

  const queryAccounts = async () => {
    const res = await GET_ACCOUNTS();
    if (res.length) {
      setAccounts(res);
      return res; // 返回响应结果
    }
  };

  const checkLogin = () => {
    if (!firstName || !lastName || !userName) {
      return navigate("/sign");
    }
    return queryAccounts().then((response) => {
      console.log(response); // 打印响应结果
    });
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
    console.log("updateUserInfo", res);
    const res2 = await GET_PROFILE();
    dispatch(saveUserInfo(res2));
    console.log("saveUserInfo", res2);
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

        {accounts.length &&
          accounts.map((account) => (
            <AccountCard key={account.id} {...account}></AccountCard>
          ))}
      </main>
      <Footer />
    </>
  );
}
