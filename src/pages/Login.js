import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Login = ({uname, unameRef,pwordRef,handleLogin}) => {
    const navigate = useNavigate();  
    console.log(`Login: uname=${uname}`)
    useEffect(() => {
      if (uname) {
        console.log(`Login: navigate( '/')` );
        navigate('/'); // <-- redirect
      }
    }, [uname, navigate]);
    return (<div>     
        <h1>Login</h1>
        <div>Username <input type="text" ref={unameRef} /></div>
        <div>Password <input type="password" ref={pwordRef} /></div>
        <div><button onClick={handleLogin}>Login</button></div>
         </div>);
}
export default Login;