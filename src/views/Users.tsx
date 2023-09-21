import { useEffect, useState } from "react";
import axiosClient from "../services/PHPAPI";
import { Link } from "react-router-dom";
import User from "../models/User";
import LoadingAnimation from "../components/LoadingAnimation";
import { useUserContext } from "../contexts/UserContext";

const Users = () => {
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);

  const { setNotification } = useUserContext();

  useEffect(() => {
    getUsers();
  }, []);

  const onDelete = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axiosClient.delete(`/users/${userId}`).then(() => {
        setNotification("User was successfully deleted");
        getUsers();
      });
    }
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="user-layout">
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan={5} className="text-center">
                  <LoadingAnimation />
                </td>
              </tr>
            </tbody>
          )}

          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <Link className="btn-edit" to={`/users/${user.id}`}>
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(user.id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
