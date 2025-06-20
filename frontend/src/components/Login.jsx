
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ updateUserDetails }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        const response = await axios.post('http://localhost:5000/auth/login', body, config);
        updateUserDetails(response.data.userDetails);
        navigate('/dashboard');
      } catch (e) {
        console.error(e);
        setMessage('Invalid credentials or server error.');
      }
    }
  };

  return (
    <div className="container text-center">
      <h1>Login Page</h1>

      {message && <div className="text-red-600 mb-2">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="text-red-500">{errors.username}</div>}
        </div>

        <div className="mb-2">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="text-red-500">{errors.password}</div>}
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
