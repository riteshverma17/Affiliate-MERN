import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverEndpoint } from '../config';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../redux/user/action';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error as user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    if (formData.username.trim() === '') {
      newErrors.username = 'Username is mandatory';
      isValid = false;
    }
    if (formData.password.trim() === '') {
      newErrors.password = 'Password is mandatory';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const body = {
        username: formData.username,
        password: formData.password,
      };

      const config = {
        withCredentials: true,
      };

      try {
        const response = await axios.post(
          `${serverEndpoint}/auth/login`,
          body,
          config
        );

        dispatch({
          type: SET_USER,
          payload: response.data.userDetails,
        });

        navigate('/dashboard');
      } catch (error) {
        if (error?.response?.status === 401) {
          setErrors({ username: 'Invalid username or password' });
        } else {
          setServerError('Something went wrong. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-md p-6 border rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {serverError && (
          <div className="text-red-500 text-sm mb-2">{serverError}</div>
        )}

        <div>
          <label className="block text-left mb-1">Email:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.username && (
            <div className="text-red-500 text-sm mt-1">{errors.username}</div>
          )}
        </div>

        <div>
          <label className="block text-left mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
