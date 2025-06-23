import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Logout from "./components/Logout";
import Error from "./components/Error";

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); //

  const updateUserDetails = (updatedData) => {
    setUserDetails(updatedData);
  };

  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/is-user-logged-in",
        {},
        { withCredentials: true }
      );
      updateUserDetails(response.data.userDetails);
    } catch (e) {
      console.log("User not logged in:", e.message);
    } finally {
      setLoading(false); // ✅ Done checking
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  });

  // 🔃 Optional: Show loading message while checking auth status
  if (loading) {
    return <div className="text-center mt-10">Checking login status...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Home />
            </AppLayout>
          )
        }
      />
      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Login updateUserDetails={updateUserDetails} />
            </AppLayout>
          )
        }
      />
      <Route
        path="/signup"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Signup />
            </AppLayout>
          )
        }
      />
      <Route
        path="/dashboard"
        element={userDetails ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/logout"
        element={
          userDetails ? (
            <Logout updateUserDetails={updateUserDetails} />
          ) : (
            +(<Navigate to="/login" />)
          )
        }
      />
      <Route
        path="/error"
        element={
          userDetails ? (
            <Error />
          ) : (
            <AppLayout>
              <Error />
            </AppLayout>
          )
        }
      />
    </Routes>
  );
}

export default App;
