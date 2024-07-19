import React from "react";
import "./Signup.css";
const Headin = ({ first, last }) => {
  return (
    <div>
      <h1 className="sign-up-heading text-center">
        {first}
        <br /> {last}
      </h1>
    </div>
  );
};

export default Headin;
