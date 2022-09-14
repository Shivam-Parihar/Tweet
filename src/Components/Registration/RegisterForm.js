import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm(props) {
  const navigate = useNavigate();

  const initialValues = {
    FirstName: "",
    LastName: "",
    Gender: "",
    Phone: "",
    DOB: "",
    email: "",
    password: "",
    username: "",
  };
  //For Validation
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //Validating the input
  const validate = (loginData) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    console.log("check", loginData);
    if (
      loginData.FirstName == undefined ||
      loginData.FirstName == "" ||
      loginData.FirstName == null
    ) {
      errors.FirstName = "FirstName is required";
    }
    if (
      loginData.LastName == undefined ||
      loginData.LastName == null ||
      loginData.LastName == ""
    ) {
      errors.LastName = "LastName is required";
    }
    if (
      loginData.Gender == undefined ||
      loginData.Gender == null ||
      loginData.Gender == ""
    ) {
      errors.Gender = "Select any Gender";
    }
    if (
      loginData.DOB == undefined ||
      loginData.DOB == null ||
      loginData.DOB == ""
    ) {
      errors.DOB = "Date of Birth is required";
    }
    if (
      loginData.Phone == undefined ||
      loginData.Phone == null ||
      loginData.Phone == ""
    ) {
      errors.Phone = "Phone is required";
    }
    if (
      loginData.email == undefined ||
      loginData.email == null ||
      loginData.email == ""
    ) {
      errors.Email = "Email is required";
    } else if (!regex.test(loginData.email)) {
      errors.Email = "This is not a valid Email Format";
    }
    if (
      loginData.username == undefined ||
      loginData.username == null ||
      loginData.username == ""
    ) {
      errors.username = "username is required";
    }
    if (
      loginData.password == undefined ||
      loginData.password == null ||
      loginData.password == ""
    ) {
      errors.password = "password is required";
    } else if (loginData.password < 4) {
      errors.password = "Password must be greater than 4 characters";
    }
    return errors;
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    //setFormValues(initialValues);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      userRegistrationHandler(formValues);
    }
  }, [formErrors]);

  async function userRegistrationHandler(registereduserdata) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/User/Register`,
      {
        method: "POST",
        body: JSON.stringify(registereduserdata),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    document.getElementById("RegisterForm").reset();
    console.log(data);
    setMessage(data.Message);
    setFormValues(initialValues);
  }

  return (
    <div className="center">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form id="RegisterForm" onSubmit={submitHandler}>
            <h3>Register User</h3>
            <div className="message">
              {isSubmit && <div className="ui message success">{message}</div>}
            </div>
            <div className="validate">
              <label htmlFor="fname">First Name</label>
              <br></br>
              <input
                className="form-control"
                type="text"
                id="fname"
                name="FirstName"
                placeholder="Enter First Name"
                onChange={onChangeHandler}
              />
              <p>{formErrors.FirstName}</p>
            </div>
            <div className="validate">
              <label htmlFor="lname">Last Name</label>
              <br></br>
              <input
                className="form-control"
                type="text"
                id="lname"
                name="LastName"
                placeholder="Enter Last Name"
                onChange={onChangeHandler}
              />
              <p>{formErrors.LastName}</p>
            </div>
            <div className="validate" onChange={onChangeHandler}>
              <label>Gender</label>
              <br></br>
              <br></br>
              <input type="radio" id="male" name="Gender" value="male" />
              <label for="male">Male</label>
              <input type="radio" id="female" name="Gender" value="female" />
              <label for="female">Female</label>
              <p>{formErrors.Gender}</p>
              <br></br>
              <br></br>
            </div>
            <div className="validate">
              <label htmlFor="dob">Date of Birth</label>
              <br></br>
              <input
                className="form-control"
                type="date"
                name="DOB"
                placeholder="Select DOB"
                onChange={onChangeHandler}
              ></input>
              <p>{formErrors.DOB}</p>
            </div>
            <div className="validate">
              <label htmlFor="phone">Phone Number</label>
              <br></br>
              <input
                className="form-control"
                type="number"
                name="Phone"
                placeholder="Phone Number"
                onChange={onChangeHandler}
              ></input>
              <p>{formErrors.Phone}</p>
            </div>
            <div className="validate">
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                className="form-control"
                type="email"
                placeholder="Enter Email"
                id="email"
                name="email"
                onChange={onChangeHandler}
              />
              <p>{formErrors.Email}</p>
            </div>
            <div className="validate">
              <label htmlFor="username">Username</label>
              <br></br>
              <input
                type="text"
                id="username"
                placeholder="Enter Username"
                className="form-control"
                name="username"
                onChange={onChangeHandler}
              />
              <p>{formErrors.username}</p>
            </div>
            <div className="validate">
              <label htmlFor="password">Password</label>
              <br></br>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="form-control"
                name="password"
                onChange={onChangeHandler}
              ></input>
              <p>{formErrors.password}</p>
            </div>

            <button className="small">Register</button>

            <p className="forgot-password text-right">
              Already registered <a href="/login">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
