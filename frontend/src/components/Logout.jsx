import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ updateUserDetails }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      updateUserDetails(null); // Clear local auth state
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
