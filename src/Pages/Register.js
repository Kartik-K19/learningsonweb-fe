import React, {useState, useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import '../styles/register.css'
import { API } from '../constant';
import { Context } from '../Context/context';
import { setToken } from '../helpers';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {

  const navigate = useNavigate();
    
  const { setUser,makeUserCart } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword:''
  });

  const handleCheckboxChange = (event) => {
    setShowPassword(event.target.checked);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formValues);
    // pass the form values to your onFinish function
    if(formValues.password != formValues.repeatPassword){
      toast.error('Passwords did not match', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{
    onFinish(formValues);
    }
  }

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);
        
        makeUserCart(data.jwt,data.user.id);

        toast.success("Registered Successfully", {
          position: "top-right",
        });

        setTimeout(()=>{
          navigate("/profile", { replace: true });
        },1200)
      }
    } catch (error) {
      // console.error(error);
      toast.error(`${error?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setError(error?.message ?? "Something went wrong!");

    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
    
 
    <div className="register-container">
        <form onSubmit={handleSubmit}>
      <h1>Register a new account</h1>
      <input type="text" name="username" placeholder='Username' onChange={handleChange} required/>
      <input className="email inputBtn" type="email" placeholder="Email" name="email" onChange={handleChange} required/>
      <input
        className="password passBtn"
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        name="password"
        autoComplete="off"
        onChange={handleChange}
        required
      />
      <input
        className="password passBtn"
        type={showPassword ? 'text' : 'password'}
        placeholder="Repeat Password"
        name="repeatPassword"
        autoComplete="off"
        onChange={handleChange}
        required
      />
      <span>
        <input
        className="togglePasswordVisibilityCheckbox"
        type="checkbox"
        checked={showPassword}
        onChange={handleCheckboxChange} style={{marginRight:"4px"}} 
      />
      
      <label htmlFor="togglePasswordVisibilityCheckbox">
        {showPassword ? 'Hide' : 'Show'} Password
      </label>
      </span>
      
      <button type="submit" className="submitBtn">SIGN UP</button>
      <span className="Member"><span>Are you a member?</span>
      <Link className="newRegister" to="/login">Login now</Link>
    </span>
    
      
      
      </form>

    </div>
    <ToastContainer/>
    </>
  )
}

export default Register