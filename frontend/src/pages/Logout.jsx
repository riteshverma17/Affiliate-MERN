import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverEndpoint } from "../config/config";
import { useDispatch } from "react-redux";
import { CLEAR_USER } from "../redux/user/actions"

function Logout({ updateUserDetails }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(`${serverEndpoint}/auth/logout`, {}, { withCredentials: true });
      dispatch({
        type: CLEAR_USER
      })
      navigate('/login');      // ✅ Redirect after logout
    } catch (e) {
      console.log('Logout error:', e);
      navigate('/error');
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="text-center mt-10">
      Logging you out...
    </div>
  );
}

export default Logout;
