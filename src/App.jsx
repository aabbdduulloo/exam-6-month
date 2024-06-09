import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidenav from "@/Sidenav";
import Users from "@Users";
import Todos from "@Todos";
import LoginPage from "@LoginPage";
import SingleProduct from "@SingleProduct";
import { Snackbar, Alert } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = (email, password, rememberMe) => {
    if (email === "Login" && password === "123") {
      setIsAuthenticated(true);
      setSnackbarMessage("Successfully logged in!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      if (rememberMe) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        sessionStorage.setItem("isAuthenticated", "true");
      }
    } else {
      setSnackbarMessage("Invalid email or password!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {isAuthenticated ? (
          <>
            <Sidenav onLogout={handleLogout} />
            <main style={{ flexGrow: 1, padding: "16px" }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <h2>
                        {" "}
                        <ArrowCircleLeftIcon /> Choose a page from the left side
                        menu{" "}
                      </h2>
                    </div>
                  }
                />
                <Route path="/users" element={<Users />} />
                <Route path="/todos" element={<Todos />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Router>
  );
}

export default App;
