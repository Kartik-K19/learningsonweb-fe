import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Context } from "../Context/context";
import { setToken } from "../helpers";
import { API } from "../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { user, setUser } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });



 

  const handleCheckboxChange = (event) => {
    setShowPassword(event.target.checked);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // pass the form values to your onFinish function
    onFinish(formValues);
  };

  const onFinish = async (values) => {
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

        toast.success("Login Successfull", {
          position: "top-right",
          autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        
        navigate("/profile", { replace: true });
        
      }
    } catch (error) {
      // console.error(error);
      setError(error?.message ?? "Something went wrong!");
      toast.error('Invalid Login Credentials', {
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
  };

  // console.log(user)
  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} id="login">
          <h1>Login with your site account</h1>
          <input
            className="email inputBtn"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            className="password passBtn"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            autoComplete="off"
            onChange={handleChange}
            required
          />
          <span>
            <input
              className="togglePasswordVisibilityCheckbox"
              type="checkbox"
              checked={showPassword}
              onChange={handleCheckboxChange}
              style={{ marginRight: "4px" }}
            />
            <label htmlFor="togglePasswordVisibilityCheckbox">
              {showPassword ? "Hide" : "Show"} Password
            </label>
          </span>

         
          <button type="submit" className="submitBtn">
            Login
          </button>
          <span className="Member">
            <span>Not a member?</span>
            <Link className="newRegister" to="/register">
              Register Now
            </Link>
          </span>
        </form>

       
      </div>
     
    </>
  );
}

export default Login;
