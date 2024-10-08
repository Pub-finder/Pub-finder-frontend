import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthContainer from "../AuthContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../../redux/slices/apiSlices/authApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import styles from '../style.module.scss';

export default function LoginForm(){
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [login, { isLoading }] = useLoginMutation();
    const [formError, setFormError] = useState()
    const [formInput, setFormInput] = useState({
        username: "",
        password: "",
    });

    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await login(formInput).unwrap()
        const user = formInput.username
        dispatch(setCredentials({ response, user }));

        setFormInput({
          username: "",
          password: "",
        });
        navigate('/')
      } catch (err) {
        setFormError("Login Failed")
      }
    }

    return (
      <AuthContainer title="Login to your account">
        <form onSubmit={handleSubmit}>
          <input
            id="username"
            name="username"
            type="username"
            placeholder="Username"
            autoComplete="username"
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
          <p className={styles.errorMsg} >{formError}</p>


          <button type="submit">
            Sign In
          </button>

          <span className={styles.infoText}>
            Don't have an account yet?
              <Link to="/signup" >Sign Up</Link>
          </span>
        </form>
      </AuthContainer>
    );
}