import React from "react";
import PropTypes from "prop-types";

function AccountCard(props) {
  const { accountTitle, amount, description, id } = props; // id-->accountId

  const queryDetail = () => {
    console.log("query detail");
  };
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountTitle}</h3>
        <p className="account-amount">${amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button" onClick={queryDetail}>
          View transactions
        </button>
      </div>
    </section>
  );
}

AccountCard.propTypes = {
  title: "string",
};

export default AccountCard;
