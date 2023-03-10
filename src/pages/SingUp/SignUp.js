import React, { useRef, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Form from "../../UI/Form";
import Button from "../../UI/Button";
import messageIcon from "../../Assets/messages.png";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const history = useHistory("");
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const pswdRef = useRef("");
  const [error, setError] = useState(false);

  const signUpSubmitHandler = async (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: pswdRef.current.value
    };

    try {
      const response = await axios.post(
        "https://group-chat-backend-i2bd.onrender.com/signUp",
        data,
        {
          headers: { "content-type": "application/json" }
        }
      );

      if (response.status !== 201) {
        throw new Error(response);
      } else {
        history.push("/signIn");
      }
    } catch (error) {
      if (error.response.data.errors[0].value === data.email) {
        setError("User Email Already Exists, Please Login...");
      }

      if (error.response.data.errors[0].value === data.phone) {
        setError("User Phone Number Already Exists, Please Login...");
      }
    }
  };

  return (
    <React.Fragment>
      <img
        src={messageIcon}
        alt="Messenger"
        className={classes.mainImage}
      ></img>
      <Form onSubmit={signUpSubmitHandler}>
        <div>
          <h3>Sign Up</h3>
        </div>
        <div>
          <input
            id="nameId"
            placeholder="Username"
            type="text"
            ref={nameRef}
            required
          ></input>
          <input
            id="emailId"
            placeholder="Email"
            type="text"
            ref={emailRef}
            required
          ></input>
          <input
            id="phnId"
            placeholder="Phone Number"
            type="tel"
            ref={phoneRef}
            required
          ></input>
          <input
            id="passwordId"
            placeholder="Password"
            type="password"
            ref={pswdRef}
            required
          />
        </div>
        <Button>Sign Up</Button>
        <Link to="/signIn">Already a user, SignIn...</Link>
      </Form>
      {error ? <h4>{error}</h4> : null}
    </React.Fragment>
  );
};

export default SignUp;
