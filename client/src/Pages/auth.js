import {useState} from 'react';
import axios from 'axios';
import './auth.css';
import '../App.css';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom'; 
export const Auth = () => {
  
  return(
    <div className="auth">
        <Login></Login>
        
    </div>
  )
}

const Login = () =>{
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [passwordType,setPasswordType]=useState("password");
  const [,setCookies]=useCookies(["access_token"]);
  const navigate=useNavigate();
  const onSubmit=async(event)=>{
    event.preventDefault();
    try{
      // const response=await axios.post("http://localhost:3001/auth/login",{
      // username,password
      // });
      const response=await axios.post("/auth/login",{
      username,password
      });
      if(response.data.token){
        setCookies("access_token",response.data.token);
        window.localStorage.setItem("userID",response.data.userId);
        navigate("/");
      }else{
        alert(response.data.message);
      }
      
      
    }catch(err){
      //console.log(err);
    }
  }
  const navigateToRegister=()=>{
    navigate("/register");
  }
  return <Form 
    username={username}
    setUserName={setUserName}
    password={password}
    setPassword={setPassword}
    label="Login"
    labelStyle={{color:'white'}}
    passwordType={passwordType}
    setPasswordType={setPasswordType}
    onSubmit={onSubmit}
    navigatebutton="New User"
    functiontoNavigate={navigateToRegister}>
  </Form>
};

export const Form = ({username,setUserName,password,setPassword,label,labelStyle,passwordType,setPasswordType,onSubmit,navigatebutton,functiontoNavigate}) =>{
  
  const handlePasswordType =() =>{
    if(passwordType==="password"){
      setPasswordType("text");
    }
    else{
      setPasswordType("password");
    }
  }
  
  return (
  
  <div className="auth-container">
  <form onSubmit={onSubmit}>
    <h2 style={labelStyle}>{label}</h2>
    <div className="form-group">
      <label htmlfor="username" style={{color: 'white'}}> Username: </label>
      <input type="text" required id="username" value={username} onChange={(event)=>{
        setUserName(event.target.value);
      }}></input>
    </div>
    <div className="form-group">
      <label htmlfor="password" style={{color:'white'}}> Password: </label>
      <input required type={passwordType} id="password" value={password} onChange={(event)=>{
        setPassword(event.target.value);
      }} style={{marginRight:'5px'}}></input>
      <button className={passwordType==="password"?"eye":"noteye"} onClick={handlePasswordType} type="button" >&#128065;</button>
    </div>
    <button className="formSubmit" type="submit">{label}</button>
    <button type='button' onClick={functiontoNavigate}>{navigatebutton}</button>
  </form>
</div>
  )
}