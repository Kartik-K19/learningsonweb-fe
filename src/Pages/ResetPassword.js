import React,{useState} from 'react'
import axios from 'axios';
import '../styles/resetpassword.css'
import { API } from '../constant';

const ResetPassword = () => {

    const [formValues, setFormValues] = useState({
        email: '',
       
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
        // console.log(formValues);
        // pass the form values to your onFinish function
        
        
        onFinish(formValues);
        
      }

    const onFinish= async(values)=>{
        
        console.log(values)
        const data= {
            
            email:values.email
        }
        
        
        await axios
            .post(`${API}/auth/forgot-password`,data)
            .then(response => {
          console.log('Your user received an email');
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });

    }
   

  return (
    <>
       <div className="reset-container">
       <form onSubmit={handleSubmit}>
        <h3>Enter your Registered email to reset password</h3>
       <input
            className="email inputBtn"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />

          <button type="submit" className="submitBtn">Submit</button>
          </form>
       </div>
    </>
  )
}

export default ResetPassword