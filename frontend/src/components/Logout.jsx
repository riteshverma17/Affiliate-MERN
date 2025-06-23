import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Logout( {updateUserDetails}) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await axios.post('http://localhost:5000/auth/logout');
            updateUserDetails(null);
        }catch(e){
            console.log(e);
            navigate('/error');
            
        }
    } 

    useEffect(() => {
      handleLogout();
    },[]);

 
}

export default Logout

