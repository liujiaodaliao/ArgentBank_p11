import React from "react";
import PropTypes from "prop-types";

function Card(props) {
  console.log(props);
  return (
    <div>
      <h3>Title:{props.title}</h3>
      <h4>subTitle:{props.subTitle}</h4>
      <p onClick={() => props.onDetail("Component value")}>alert</p>
    </div>
  );
}

Card.propTypes = {
  title: "string",
};

export default Card;
