import React, {useState, useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import './style.css';

export default function App() {
  const [uname, unameSetter] = useState(null);   // controls the
  const unameRef = useRef();
  const pwordRef = useRef();  

  const handleLogout = () => {
    unameSetter(null);
  }
  const handleLogin = () => {
    let user = {};
    user.uname = unameRef.current.value;
    user.pword = pwordRef.current.value;

    let parameters = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }
    console.log('user.uname called') 
    let url = `http://localhost:5001/users`;        //localhost:5001/users/ [POST]
    fetch( url, parameters)
      .then( res => res.json())
      .then( json => {
        console.log(JSON.stringify(json))
        const u = json.users;
        if (!u) {
          console.log('invalid uname doesnt exist');
        }
        else if (u[0].pword !== user.pword) {
          console.log('invalid password');
        }
        else {
          console.log('valid uname and password');
          unameSetter( user.uname);
        }
      })
  }


  
  //if (!uname)
  //  handleNotLoggedIn();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home uname={uname} />} />
          <Route path="login" element={<Login  
            uname={uname}  unameRef={unameRef} pwordRef={pwordRef} 
            handleLogin={handleLogin} />} />
          <Route path="register" element={<Register  />} />
          <Route path="logout" element={<Logout uname={uname} handleLogout={handleLogout} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}