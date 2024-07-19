import React, { useState } from "react";
import "./Signup.css";
import Headin from "./Headin";
import { GrEmergency } from "react-icons/gr";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    // console.log({ inputs });
    await axios
      .post(`https://taskmanager-y5qh.onrender.com/api/v1/register`, inputs)
      .then((res) => {
        toast(res.data.message);
        if (res.data.message === "SignUp Successful") {
          console.log(res);

          setInputs({ email: "", username: "", password: "" });
          history("/signin");
        }
      });
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column p-3 w-100">
              <input
                type="text"
                placeholder="Enter your Name"
                className="p-2 m-3 input-signup"
                name="username"
                onChange={change}
                value={inputs.username}
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 m-3 input-signup"
                name="email"
                onChange={change}
                value={inputs.email}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="p-2 m-3 input-signup"
                name="password"
                onChange={change}
                value={inputs.password}
              />
              <button className="btn-signup p-2 m-3" onClick={submit}>
                SignUp
              </button>
            </div>
          </div>
          <div className="d-lg-block d-none col-left col-lg-4  column d-lg-flex justify-content-center align-items-center">
            <Headin first="Sign" last="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
