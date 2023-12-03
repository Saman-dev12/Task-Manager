// Card.jsx
"use client";
import React from "react";

const Card = (props) => {
  return (
    <div className="card flex flex-col gap-4 p-8 bg-white rounded-xl justify-center items-center w-72 h-96">
      <div className="icon p-4 bg-gray-100 text-xl rounded-xl">
        {props.icon}
      </div>
      <div className="heading font-semibold text-xl h-10">{props.heading}</div>
      <div className="content text-center text-base">{props.content}</div>
    </div>
  );
};

export default Card;
