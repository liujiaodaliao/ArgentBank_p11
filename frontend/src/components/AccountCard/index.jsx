import React, { useState } from "react";
import PropTypes from "prop-types";
import { GET_TRANSACTIONS } from "../../services/transaction";

function AccountCard(props) {
  const { accountTitle, amount, description, id } = props; // id-->accountId

  const [transactions, setTransactions] = useState([]);
  const queryDetail = async () => {
    const res = await GET_TRANSACTIONS({ id });
    if (res.length) {
      setTransactions(res);
      console.log(res);
    }
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

// 约束使用这个组件的参数格式
AccountCard.propTypes = {
  accountTitle: PropTypes.string,
  amount: PropTypes.number,
};

export default AccountCard;
