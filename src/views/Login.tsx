import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import axiosClient from "../services/PHPAPI";
import FormErrors from "../components/FormErrors";
import { Errors } from "../models/Errors";
import LoadingAnimation from "../components/LoadingAnimation";
import UserLogin from "../models/UserLogin";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [renderLoader, setRenderLoader] = useState(false);
  const [errors, setErrors] = useState<Errors>(null);

  const { setUser, setToken } = useUserContext();

  const loginHandler = (user: UserLogin) => {
    axiosClient
      .post("/login", user)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        setRenderLoader(false);
        const response = err.response;
        console.log(err);
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({ email: [response.data.message] });
          }
        } else {
          setErrors({ email: ["Server down! Try again later."] });
        }
      });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: UserLogin = {
      email: (emailRef.current! as HTMLInputElement).value,
      password: (passwordRef.current! as HTMLInputElement).value,
    };

    setRenderLoader(true);

    loginHandler(payload);
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <FormErrors errors={errors} />

          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            autoComplete="password"
          />
          <button className="btn btn-block">
            {renderLoader ? <LoadingAnimation /> : "Login"}
          </button>
          <p className="message">
            Not Registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
