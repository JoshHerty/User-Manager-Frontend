import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/users" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<UserForm key="userCreate" />} />
          <Route path="/users/:id" element={<UserForm key="userUpdate" />} />
        </Route>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/users" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<UserForm key="userCreate" />} />
          <Route path="/users/:id" element={<UserForm key="userUpdate" />} />
        </Route>

        <Route path="/" element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
