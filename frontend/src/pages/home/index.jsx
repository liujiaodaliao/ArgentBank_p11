import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import IconChat from "../../assets/icon-chat.webp";
import IconMoney from "../../assets/icon-money.webp";
import IconSecurity from "../../assets/icon-security.webp";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import FeatureCard from "../../components/FeatureCard";
export default function Home() {
  const navigate = useNavigate();

  const cardList = [
    {
      icon: IconChat,
      title: "You are our #1 priority",
      subTitle:
        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      icon: IconMoney,
      title: "More savings means higher rates",
      subTitle:
        "The more you save with us, the higher your interest rate will be!",
    },
    {
      icon: IconSecurity,
      title: "Security you can trust",
      subTitle:
        "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];

  const nav2User = () => {
    navigate("/user");
  };

  return (
    <>
      <Header userClick={nav2User}></Header>
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>

          {cardList.map((item, index) => {
            return <FeatureCard key={index} {...item}></FeatureCard>;
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
