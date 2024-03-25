import React, { Component } from "react";
import { Link } from "react-router-dom";

import argentBankLogo from "../../assets/argentBankLogo.webp";

export default function Header(props) {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="right">{props.children}</div>
    </nav>
  );
}
