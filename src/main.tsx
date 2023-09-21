// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import router from "./router.tsx";
// import { RouterProvider } from "react-router-dom";
// import UserContextProvider from "./contexts/UserContextProvider.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <UserContextProvider>
//       <RouterProvider router={router} />
//     </UserContextProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserContextProvider from "./contexts/UserContextProvider.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
