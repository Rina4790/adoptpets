import { useHistory } from "react-router-dom";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import styles from "./Login.module.css";
import { useCallback, useEffect, useState } from "react";
import { validationService } from "../../services/validation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { IState } from "../../redux/store";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state: IState) => state.authReducer.error);
  const history = useHistory();

  const isLoggedIn = useSelector(
    (state: IState) => state.authReducer.isLoggedIn
  );

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
      window.location.reload();
    }
  }, [isLoggedIn]);

  const onChangeUsername = useCallback((event) => {
    const value = event.target.value;
    setUsername(value);

    const error = validationService.validateName(value);

    setErrors((errors) => ({ ...errors, username: error }));
  }, []);

  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const onClick = () => {
    const errors = {
      username: validationService.validateName(username),
      password: validationService.validatePassword(password),
    };

    setErrors(errors);

    const values = Object.values(errors);
    const isValid = values.every((value) => value === "");

    if (isValid) {
      dispatch(login(username, password));
    }
  };

  const errorValues = error ? Object.values(error).flat() : "";

  return (
    <div className={styles.login}>
      <div className={styles.mainForm}>
        <div className={styles.title}></div>

        <div className={styles.form}>
          <Input
            type="username"
            label="Username"
            onChange={onChangeUsername}
            value={username}
            error={errors.username}
          />
          <Input
            type="password"
            label="Password"
            onChange={onChangePassword}
            value={password}
            error={errors.password}
          />
          <p>{errorValues}</p>
          <Button onClick={onClick}>Login</Button>
        </div>
      </div>
    </div>
  );
};
