import React, { Component } from "react";

export default function FeatureCard(props) {
  const { icon, title, subTitle } = props;
  return (
    <div className="feature-item">
      <img
        src={icon}
        alt="Chat Icon"
        className="feature-icon"
        width="100"
        height="100"
      />
      <h3 className="feature-item-title">{title}</h3>
      <p>{subTitle}</p>
    </div>
  );
}
