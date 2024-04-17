import {useState} from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom'; 
import { Form } from './auth.js';
export const Register = () => {
  const navigate=useNavigate();
  return(
    <div className="auth">
        <RegisterNew></RegisterNew>
    </div>
  )
}


const RegisterNew =()=>{
  
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [passwordType,setPasswordType]=useState("password");
  const navigate=useNavigate();
  const onSubmit=async (event)=>{
    event.preventDefault();
    // try{
    //   const response=await axios.post("http://localhost:3001/auth/register",{
    //     username,
    //     password,
    //   }
    //   );
    //   alert(response.data.message);
    // }
    try{
      const response=await axios.post("/auth/register",{
        username,
        password,
      }
      );
      alert(response.data.message);
    }
    catch(err){
     // console.log(err);
    }

  }
  const navigateToLogin=()=>{
    
    navigate("/auth");
  }
  return <Form 
    username={username}
    setUserName={setUserName}
    password={password}
    setPassword={setPassword}
    // label={<span style={{ color: 'white' }}>Register</span>}
    label="Register"
    labelStyle={{color:'white'}}
    passwordType={passwordType}
    setPasswordType={setPasswordType}
    onSubmit={onSubmit}
    navigatebutton={"Login"}
    functiontoNavigate={navigateToLogin}
    
    >
  </Form>
    
}

