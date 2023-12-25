import "./login.css";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("Logged in successfully");
    navigate("/");
  };

  return (
    <Fragment>
      <div className="loginparent">
        <div className="login-page">
          <div className="formrm">
            <form className="login-form" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button>login</button>
              <p className="messagege">
                Not registered? <Link to="/register">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
