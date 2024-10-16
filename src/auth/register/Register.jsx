import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthContainer from "../AuthContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from "../../redux/slices/apiSlices/authApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import styles from '../style.module.scss';

export default function Register() {
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();
  let navigate = useNavigate()
  const [formError, setFormError] = useState()
  const [formInput, setFormInput] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMsg: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formInput.password != formInput.confirmPassword) {
      setFormError("Password and Confirm Password needs to be the same.");
      return;
    }

    try {
      const response = await signup(formInput).unwrap();
      dispatch(setCredentials({
          userId: response.userId,
          username: formInput.username,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
      }));

      setFormInput({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        successMsg: "",
      });
      navigate('/')
    } catch (err) {
      console.log(err)
      setFormError(err?.data)
    }
  }

  return (
    <AuthContainer title="Sign Up">
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              id="fistname"
              name="firstname"
              type="text"
              placeholder="Fistname"
              autoComplete="firstname"
              required
              className={styles.inputName}
              onChange={({ target }) => { handleUserInput(target.name, target.value) }}
            />
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Lastname"
              autoComplete="lastname"
              required
              className={styles.inputName}
              onChange={({ target }) => { handleUserInput(target.name, target.value) }}
            />
          </div>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            required
            className={styles.input}
            onChange={({ target }) => { handleUserInput(target.name, target.value) }}
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            required
            className={styles.input}
            onChange={({ target }) => { handleUserInput(target.name, target.value) }}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            className={styles.input}
            onChange={({ target }) => { handleUserInput(target.name, target.value) }}
          />

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            className={styles.input}
            onChange={({ target }) => { handleUserInput(target.name, target.value) }}
          />
          <p className={styles.errorMsg} >{formError}</p>

          <button type="submit">
            Submit
          </button>

          <span className={styles.infoText}>
                Do You already have an account?
                <Link to="/login" >Sign In</Link>
          </span>

        </form>
    </AuthContainer>
  );
}