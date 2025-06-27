import { useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../config';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../redux/user/action';

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 6 characters, include a number and special character';
      isValid = false;
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await axios.post(`${serverEndpoint}/auth/register`, formData, {
          withCredentials: true,
        });

        dispatch({
          type: SET_USER,
          payload: res.data.userDetails,
        });

        alert(res.data.message);
        navigate('/dashboard');
      } catch (error) {
        if (error?.response?.status === 401) {
          setErrors({ email: 'User already exists with this email' });
        } else {
          setErrors({ general: 'Something went wrong. Please try again.' });
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

      navigate('/dashboard');
    } catch (e) {
      setErrors({ general: 'Google Sign-In failed' });
    }
  };

  const handleGoogleSigninFailure = () => {
    setErrors({ general: 'Google Sign-In failed' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50 to-cyan-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-cyan-200 shadow-xl rounded-3xl p-8 md:p-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-700">Register</h1>

        {errors.general && (
          <p className="text-red-500 text-center text-sm mb-4">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-cyan-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-cyan-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-cyan-700 mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 transform -translate-y-1/2 text-cyan-700"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-cyan-700 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 transform -translate-y-1/2 text-cyan-700"
              onClick={() => setShowConfirmPassword(prev => !prev)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-xl font-semibold shadow-md transition"
          >
            Register
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
              onError={handleGoogleSigninFailure}
              theme="filled_blue"
              shape="pill"
              size="large"
            />
          </div>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
