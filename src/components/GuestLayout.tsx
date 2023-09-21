import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const GuestLayout = () => {
  const { token } = useUserContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default GuestLayout;
