import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import User from "../models/User";
import axiosClient from "../services/PHPAPI";
import LoadingAnimation from "../components/LoadingAnimation";
import FormErrors from "../components/FormErrors";
import { useUserContext } from "../contexts/UserContext";

const UserForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { setNotification } = useUserContext();
  const [user, setUser] = useState<User>({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch((err) => {
          setLoading(false);
          setErrors(err);
        });
    }
  }, [id]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          // TODO show notification
          setNotification("User was successfully updated");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post(`/users`, user)
        .then(() => {
          // TODO show notification
          setNotification("User was successfully created");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <LoadingAnimation />}
        <FormErrors errors={errors} />
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              type="text"
              placeholder="Name"
            />
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
            <input
              onChange={(e) =>
                setUser({ ...user, password_confirmation: e.target.value })
              }
              type="password"
              placeholder="Password Confirmation"
              autoComplete="new-password"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
};

export default UserForm;
