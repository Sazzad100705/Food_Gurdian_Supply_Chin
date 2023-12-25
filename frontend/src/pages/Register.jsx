import "./login.css";
import React, { Fragment, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("Registered successfully");
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
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <div className="d-flex align-items-center profilecont">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={profilePreview}
                        className="rounded-circle"
                        alt="Avatar preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="profile"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>*/}
              {/* </div> 
                </div> */}
              <button>create</button>
              <p className="messagege">
                Already registered? <Link to="/login">Sign In</Link> or{" "}
              </p>
            </form>
            {/* <form className="login-form">
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <button>Register</button>
        <p className="messagege">Not registered? <Link to="#">Create an account</Link></p>
      </form> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
