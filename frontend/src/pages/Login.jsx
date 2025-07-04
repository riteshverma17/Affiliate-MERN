import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverEndpoint } from "../config/config";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/actions";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post(
          `${serverEndpoint}/auth/login`,
          {
            username: formData.username,
            password: formData.password,
          },
          { withCredentials: true }
        );

        dispatch({
          type: SET_USER,
          payload: response.data.userDetails,
        });

        navigate("/dashboard");
      } catch (error) {
        if (error?.response?.status === 401) {
          setErrors({ username: "Invalid username or password" });
        } else {
          setServerError("Something went wrong. Please try again later.");
        }
      }
    }
  };

  const handleGoogleSignin = async (authResponse) => {
    try {
      const response = await axios.post(
        `${serverEndpoint}/auth/google-auth`,
        { idToken: authResponse.credential },
        { withCredentials: true }
      );

      dispatch({
        type: SET_USER,
        payload: response.data.userDetails,
      });

      navigate("/dashboard");
    } catch (e) {
      setErrors({ message: "Google Sign-In failed" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50 to-cyan-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-cyan-200 shadow-xl rounded-3xl p-8 md:p-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-700">Login</h1>

        {serverError && (
          <p className="text-red-500 text-center text-sm mb-4">{serverError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-cyan-700 mb-1">Email</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-cyan-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 transform -translate-y-1/2 text-cyan-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              Remember Me
            </label>
            <button
              type="button"
              className="text-sm text-cyan-700 hover:underline"
              onClick={() => alert("Redirect to forgot password flow")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-xl font-semibold shadow-md transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSignin}
              onError={() => setErrors({ message: "Google Sign-In failed" })}
              theme="filled_blue"
              shape="pill"
              size="large"
            />
          </div>
        </GoogleOAuthProvider>

        {errors.message && (
          <p className="text-red-500 text-center text-sm mt-3">
            {errors.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
