import React from "react";
import Card from "./Card";
import "./cardholder.css";

const CardHolder = ({ array, activeDiv }) => {
  let filteredArray = [];

  if (activeDiv === "All" || activeDiv === "Collection") {
    filteredArray = array;
  } else {
    filteredArray = array?.filter((obj) => obj?.videoCategory === activeDiv);
  }

  return (
    <div className="cardholder_container">
      {filteredArray?.map((item, index) => (
        <Card key={index} data={item} />
      ))}
    </div>
  );
};

export default CardHolder;
