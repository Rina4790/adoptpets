import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IState } from "../../redux/store";

export const Confirm = () => {
  const email = useSelector((state: IState) => state.authReducer.email);
  const username = useSelector((state: IState) => state.authReducer.username);

  return (
    <div>
      <h1>Registration Confirmation</h1>
      <p>
        Dear {username} your account with email {email} registered successfully
      </p>
      <p>
        Please, <NavLink to="/login">Login</NavLink>
      </p>
    </div>
  );
};
