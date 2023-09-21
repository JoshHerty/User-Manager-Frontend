import { Link, Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import "../index.css";
import { useEffect } from "react";
import axiosClient from "../services/PHPAPI";

const DefaultLayout = () => {
  const { user, token, setUser, setToken, notification } = useUserContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser(null);
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div id="defaultLayout">
      {user && (
        <>
          <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
          </aside>
          <div className="content">
            <header>
              <div>Header</div>
              <div>
                {user?.name}
                <a href="#" onClick={onLogout} className="btn-logout">
                  Logout
                </a>
              </div>
              <div>User Info</div>
            </header>
            <main>
              <Outlet />
            </main>
          </div>
        </>
      )}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default DefaultLayout;
