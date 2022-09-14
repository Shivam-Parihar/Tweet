import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPasswordForm(props) {
  const navigate = useNavigate();

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPass, setEnteredPass] = useState("");
  // const [enteredDOB, setEnteredDOB] = useState("");

  const initialValues = { email: "", newPassword: "", DOB: "" };

  //Validation states
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, SetMessage] = useState("");
  const onChangeHandler = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (loginData) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    console.log("check", loginData);
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
      loginData.newPassword == "" ||
      loginData.newPassword == null ||
      loginData.newPassword == undefined
    ) {
      errors.newPassword = "Password is required";
    } else if (loginData.newPassword < 4) {
      errors.newPassword = "Password must be greater than 4 characters";
    }
    if (
      loginData.DOB == "" ||
      loginData.DOB == null ||
      loginData.DOB == undefined
    ) {
      errors.DOB = "DOB is required";
    }
    return errors;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);

    document.getElementById("ForgotPasswordForm").reset();
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      forgotPasswordHandler(formValues);
    }
  }, [formErrors]);
  async function forgotPasswordHandler(forgotpasswordData) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/User/ForgotPassword`,
      {
        method: "POST",
        body: JSON.stringify(forgotpasswordData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    SetMessage(data.Message);
    console.log(data);
    document.getElementById("ForgotPasswordForm").reset();
    setFormValues(initialValues);
  }

  return (
    <div className="center">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form id="ForgotPasswordForm" onSubmit={submitHandler}>
            <h3>Forgot Password</h3>
            <div className="message">
              {isSubmit && <div className="ui message success">{message}</div>}
            </div>
            <div className=" email_password">
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={onChangeHandler}
                value={formValues.email}
              />
              <p>{formErrors.email}</p>
            </div>
            <div className=" email_password">
              <label htmlFor="dob">Date of Birth</label>
              <br></br>
              <input
                className="form-control"
                type="date"
                name="DOB"
                onChange={onChangeHandler}
                value={formValues.DOB}
              ></input>
              <p>{formErrors.DOB}</p>
            </div>
            <div className=" email_password">
              <label htmlFor="password">New Password</label>
              <br></br>
              <input
                type="password"
                id="password"
                placeholder="Enter New Password"
                name="newPassword"
                className="form-control"
                onChange={onChangeHandler}
                value={formValues.newPassword}
              ></input>
              <p>{formErrors.newPassword}</p>
            </div>

            <button className="small">Forgot Password</button>

            <p className="forgot-password text-right">
              <a href="/login"> Sign In Now</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordForm;
