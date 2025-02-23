import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Home = ({uname}) => {
  const navigate = useNavigate();  
  console.log(`HOME: uname=${uname}`)
  useEffect(() => {
    if (!uname) {
      console.log(`HOME: navigate( '/login')` );
      navigate('/login'); // <-- redirect
    }
  }, [uname, navigate]);

  return (<div>
        <h1>The Wellness Hub</h1> 
        <h3>Login Successful {uname}</h3>
        </div>)
}
export default Home;