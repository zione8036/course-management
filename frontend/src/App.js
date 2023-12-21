import React from "react";
import DashboardContent from "./components/DashboardContent";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      {" "}
      <ToastContainer />
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<DashboardContent page={route.element} />}
            />
          );
        })}
      </Routes>
    </>
  );
};

export default App;
