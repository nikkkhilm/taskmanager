import React, { useState } from "react";
import "./Signup.css";
import Headin from "./Headin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Signin = () => {
  const dispatch = useDispatch();

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
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
      .post(`${window.location.origin}/api/v1/login`, inputs)
      .then((res) => {
        //  toast(res.data.message);
        if (res.data.message === "Signin Successful") {
          // console.log(res);
          sessionStorage.setItem("id", res.data.id);

          // this will call reducer function login using dispatch in redux store
          dispatch(authActions.login());

          setInputs({ email: "", password: "" });
          history("/todo");
        }
      });
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row p-2">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column p-3 w-100">
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
                SignIn
              </button>
            </div>
          </div>
          <div className="d-lg-block d-none col-left col-lg-4  column d-lg-flex justify-content-center align-items-center">
            <Headin first="Sign" last="In" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
