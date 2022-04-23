
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import styles from "./Registration.module.css";
import { validationService } from "../../services/validation";
import { register } from "../../redux/actions/authActions";
import { IState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state: IState) => state.authReducer.error);
  const navigate = useNavigate();
  const emailState = useSelector((state: IState) => state.authReducer.email);
  const usernameState = useSelector(
    (state: IState) => state.authReducer.username
  );


  useEffect(() => {
    if (emailState) {
      navigate("/confirm");
    }
  }, [emailState, usernameState]);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const onChangeUserName = useCallback((event) => {
    setUserName(event.target.value);
  }, []);

  const onChangeEmail = useCallback((event) => {
    const value = event.target.value;
    setEmail(value);

    const error = validationService.validateEmail(value);

    setErrors((errors) => ({ ...errors, email: error }));
  }, []);

  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const onChangeRepeatPassword = useCallback((event) => {
    setRepeatPassword(event.target.value);
  }, []);

  const onClick = () => {
    const errors = {
      username: validationService.validateName(username),
      email: validationService.validateEmail(email),
      password: validationService.validatePassword(password),
      repeatPassword: validationService.validateRepeatedPassword(
        password,
        repeatPassword
      ),
    };

    setErrors(errors);

    const values = Object.values(errors);
    const isValid = values.every((value) => value === "");
    if (isValid) {
      dispatch(register({ username, email, password }));
    }
  };

  const errorValues = error ? Object.values(error).flat() : "";

  return (
    <div className={styles.registration}>
      <div className={styles.mainForm}>
        <div className={styles.title}></div>

        <div className={styles.form}>
          <Input
            type="text"
            label="User name"
            value={username}
            onChange={onChangeUserName}
            error={errors.username}
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={onChangeEmail}
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={onChangePassword}
            error={errors.password}
          />
          <Input
            type="password"
            label="Confirm Password"
            value={repeatPassword}
            onChange={onChangeRepeatPassword}
            error={errors.repeatPassword}
          />
          <p>{errorValues}</p>
          <Button onClick={onClick}>Registration</Button>
        </div>
      </div>
    </div>
  );
};
