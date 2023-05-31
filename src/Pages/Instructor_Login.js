import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { Context } from "../Context/context";
import { setToken } from '../helpers';
import { API, } from '../constant';
import "../styles/instructor_login.css"

function Instructor_Login() {

  const {user,setUser} = useContext(Context)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    // pass the form values to your onFinish function
    onFinish(formValues);
  }
  
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        
       
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };



  return (
            <div className="login-container">
            <form onSubmit={handleSubmit}>
      <h1>Login with your site account</h1>
      <input className="email inputBtn" type="email" placeholder="Email" name="email" onChange={handleChange}/>
      <input className="password passBtn" type="password" placeholder="Password" name="password" autoComplete='on' onChange={handleChange}/>
      <span className="lostBox">
        <input type="checkbox" name="remember" className="checkbox"/>
        <label htmlFor="remember">Remember Me</label>
        <a href="#" className="forgotBtn">Lost your password?</a>
      </span>
      <button type="submit" className="submitBtn">Login</button>
        
        </form>

        </div>

  )
}

export default Instructor_Login