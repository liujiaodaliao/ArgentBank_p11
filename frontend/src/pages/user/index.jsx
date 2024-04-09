import React, { Component, useState, useEffect, useRef } from "react";
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
  const dispatch = useDispatch();

  const usernameRef = useRef();

  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const { firstName, lastName, userName } = userInfo;

  const [isEdit, setIsEdit] = useState(false); // 默认非编辑状态

  // const [_userName, set_userName] = useState(userName);

  const [accounts, setAccounts] = useState([]); // 存放账户信息

  const queryAccounts = async () => {
    const res = await GET_ACCOUNTS();
    if (res.length) {
      setAccounts(res);
    }
  };

  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSave = async () => {
    console.log(usernameRef.current.value);
    const _username = usernameRef.current.value;
    if (!_username) {
      return alert("username is required");
    }
    const res = await UPDATE_PROFILE({ userName: _username });
    alert("edit successfully ");
    setIsEdit(false);

    //将 res 传递给 saveUserInfo 函数来更新 Redux 中的用户信息
    // console.log("updateUserInfo", res);
    // const res2 = await GET_PROFILE();
    dispatch(saveUserInfo(res));
    console.log("saveUserInfo", res);
  };

  useEffect(() => {
    queryAccounts();
  }, []);

  return (
    <>
      <Header userClick={() => setIsEdit(true)}></Header>
      <main className="main bg-dark">
        {(isEdit && (
          <div className="edit">
            <h1>Edit user info</h1>
            <form>
              <div className="form-item">
                <label htmlFor="userName">userName</label>
                <input
                  ref={usernameRef}
                  name="userName"
                  type="text"
                  // value={_userName}
                  defaultValue={userName}
                  // onInput={(e) => set_userName(e.target.value)}
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
