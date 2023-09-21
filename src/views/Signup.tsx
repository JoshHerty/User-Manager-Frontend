import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../services/PHPAPI";
import { useUserContext } from "../contexts/UserContext";
import UserSignup from "../models/UserSignup";
import FormErrors from "../components/FormErrors";
import { Errors } from "../models/Errors";
import LoadingAnimation from "../components/LoadingAnimation";

const Signup = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  const [renderLoader, setRenderLoader] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);

  const { setUser, setToken } = useUserContext();

  const saveNewUserInDatabase = (newUser: UserSignup) => {
    axiosClient
      .post("/signup", newUser)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        setRenderLoader(false);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: UserSignup = {
      name: (nameRef.current! as HTMLInputElement).value,
      email: (emailRef.current! as HTMLInputElement).value,
      password: (passwordRef.current! as HTMLInputElement).value,
      password_confirmation: (
        passwordConfirmationRef.current! as HTMLInputElement
      ).value,
    };

    setRenderLoader(true);

    saveNewUserInDatabase(payload);
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>
          <FormErrors errors={errors} />

          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input
            ref={emailRef}
            type="email"
            placeholder="Email Address"
            autoComplete="email"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Password Confirmation"
            autoComplete="new-password"
          />
          <button className="btn btn-block">
            {renderLoader ? <LoadingAnimation /> : "Signup"}
          </button>
          <p className="message">
            Already Registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
