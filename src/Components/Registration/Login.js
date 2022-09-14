import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../CSS/Login.css";

//import '../CSS/Registerform.css';

function Login(props) {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, SetMessage] = useState("");

  const onChangeHandler = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (loginData) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    console.log("check", loginData.email == undefined);
    if (
      loginData.email == "" ||
      loginData.email == null ||
      loginData.email == undefined
    ) {
      errors.email = "Email is required";
    } else if (!regex.test(loginData.email)) {
      errors.email = "This is not a valid Email Format";
    }
    if (
      loginData.password == "" ||
      loginData.password == null ||
      loginData.password == undefined
    ) {
      errors.password = "Password is required";
    } else if (loginData.password < 4) {
      errors.password = "Password must be greater than 4 characters";
    }
    return errors;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      userloginHandler(formValues);
    }
  }, [formErrors]);
  async function userloginHandler(loginuserdata) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/User/Login`,
      {
        method: "POST",
        body: JSON.stringify(loginuserdata),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    SetMessage(data.Message);
    console.log(data.Message);
    localStorage.setItem("token", data.Data);
    localStorage.setItem("user", loginuserdata);

    if (localStorage.getItem("token") === "null") {
      navigate("/login", { replace: true });
    } else {
      navigate("/homepage", { replace: true });
    }
    document.getElementById("LoginForm").reset();
    setFormValues(initialValues);
  }

  return (
    <div className="center">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form id="LoginForm" onSubmit={submitHandler}>
            <h3>Sign into your account</h3>
            <div className="message">
              {isSubmit && <div className="ui message success">{message}</div>}
            </div>
            <div className=" email_password">
              <label>Email address</label>
              <br></br>
              <input
                onChange={onChangeHandler}
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={formValues.email}
              />
              <p>{formErrors.email}</p>
            </div>

            <div className="email_password">
              <label>Password</label>
              <br></br>
              <input
                onChange={onChangeHandler}
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formValues.password}
              />
              <p>{formErrors.password}</p>
            </div>
            {/* <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div> */}
            <div className="login">
              <button type="submit" className="small">
                LOGIN
              </button>
            </div>
            <p className="forgot-password text-right">
              <a href="/forgetpasswordform"> Forgot password?</a>
            </p>
            <br></br>
            <h5>
              <p>
                Don't have an account?{" "}
                <a href="/RegisterForm"> Register here</a>
              </p>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
