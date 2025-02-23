import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Logout = ({uname,handleLogout}) => {
        handleLogout();
        const navigate = useNavigate();  
        console.log(`Logout: uname=${uname}`)
        useEffect(() => {
          if (!uname) {
            console.log(`Logout: navigate( '/login')` );
            navigate('/login'); // <-- redirect
          }
        }, [uname, navigate]);
        return (<h1>User Logged Out</h1>)
}
export default Logout;