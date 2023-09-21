// // import { createBrowserRouter, Navigate } from "react-router-dom";
// // import DefaultLayout from "./components/DefaultLayout";
// // import GuestLayout from "./components/GuestLayout";
// // import Login from "./views/Login";
// // import NotFound from "./views/NotFound";
// // import Signup from "./views/Signup";
// // import Users from "./views/Users";
// // import UserForm from "./views/UserForm";
// // import Dashboard from "./views/Dashboard";

// // const router = createBrowserRouter([
//   // {
//   //   path: "/",
//   //   element: <DefaultLayout />,
//   //   children: [
//   //     {
//   //       path: "/",
//   //       element: <Navigate to="/users" />,
//   //     },
//   //     {
//   //       path: "/dashboard",
//   //       element: <Dashboard />,
//   //     },
//   //     {
//   //       path: "/users",
//   //       element: <Users />,
//   //     },
//   //     {
//   //       path: "/users/new",
//   //       element: <UserForm key="userCreate" />,
//   //     },
//   //     {
//   //       path: "/users/:id",
//   //       element: <UserForm key="userUpdate" />,
//   //     },
//   //   ],
//   // },
// //   {
// //     path: "/",
// //     element: <GuestLayout />,
// //     children: [
// //       {
// //         path: "/login",
// //         element: <Login />,
// //       },
// //       {
// //         path: "/signup",
// //         element: <Signup />,
// //       },
// //     ],
// //   },
// //   {
// //     path: "*",
// //     element: <NotFound />,
// //   },
// // ]);

// // export default router;

// import { Navigate, HashRouter as Router, Route } from "react-router-dom";
// import Login from "./views/Login";
// import Signup from "./views/Signup";
// import Users from "./views/Users";
// import NotFound from "./views/NotFound";
// import GuestLayout from "./components/GuestLayout";
// import DefaultLayout from "./components/DefaultLayout";
// import Dashboard from "./views/Dashboard";
// import UserForm from "./views/UserForm";

// const router = (
//   <Router>
//     <Route path="/" element={<DefaultLayout />}>
//       <Navigate to="/users" />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/users" element={<Users />} />
//       <Route path="/users/new" element={<UserForm key="userCreate" />} />
//       <Route path="/users/:id" element={<UserForm key="userUpdate" />} />
//     </Route>
//     <Route path="/" element={<GuestLayout />}>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//     </Route>
//     <Route path="*" element={<NotFound />} />
//   </Router>
// );

// export default router;
