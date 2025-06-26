import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Error from "./components/Error";
import Register from "./pages/Register";

import { serverEndpoint } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "./redux/user/action";

function App() {
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true); //

  

  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post(
        `${serverEndpoint}/auth/is-user-logged-in`,
        {},
        { withCredentials: true }
      );
      // updateUserDetails(response.data.userDetails);

      dispatch({
        type: SET_USER,
        payload: response.data.userDetail
      })
    } catch (e) {
      console.log("User not logged in:", e.message);
    } finally {
      setLoading(false); // ✅ Done checking
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

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
              <Login />
            </AppLayout>
          )
        }
      />
      <Route
        path="/register"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Register />
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
          userDetails ? 
            <Logout />
           : 
            <Navigate to="/login" />
          
        }
      />
      <Route
        path="/error"
        element={
          userDetails ?
            <Error />
           : 
            <AppLayout>
              <Error />
            </AppLayout>
          
        }
      />
    </Routes>
  );
}

export default App;
