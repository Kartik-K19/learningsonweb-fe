import React,{useState} from 'react'
import '../styles/contact.css';
import Footer from '../components/Footer';
import Title from '../components/Title';
import { API } from '../constant';

function Contact() {

  const [formValues, setFormValues] = useState({
    FirstName: '',
    LastName:'',
    Email: '',
    Message:'',
    Additional_message:'',
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    
    onFinish(formValues);
  
  }
  
  
  
  const onFinish = async (values) => {
    
  
    const info = {
      data:values
    }
    
   
    try {
      const response = await fetch(`${API}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(info),
      });
  
      const res = await response.json();
      if (res?.error) {
        throw res?.error;
      }
    } catch (error) {
      console.error(error);
    
    }
    setFormValues({
      FirstName: '',
      LastName:'',
      Email: '',
      Message:'',
      Additional_message:'',
    });
  };

  return (
   <>
   <Title title="Contact Us"/>

      <section className='contact-cards'>
        <div className='cont-card-container'>

      <div className="detail-card">
            <img src={require('../images/Contact/pin.png')} alt='experience'/>
            <div className='why-card-head'><h2>Address Way</h2></div>
            <div className="why-card-content">
            <p>G.H. Raisoni College of Engineering, Nagpur, 440022</p>
            </div>
            
         </div>
         <div className="detail-card">
         <img src={require('../images/Contact/support.png')} alt='quiz'/>
            <div className='why-card-head'><h2>Contact Info</h2></div>
            <div className="why-card-content">
            <p>Mobile:(+91) 9049898689</p>
            <p>Email: kartiklonkar@gmail.com</p>
            </div>
            
         </div>
         <div className="detail-card">
         <img src={require('../images/Contact/clock.png')} alt='chat'/>
            <div className='why-card-head'><h2>Work Timing</h2></div>
            <div className="why-card-content">
            <p>Monday - Friday: 9:00 - 18:00</p>
            <p>Saturday & Sunday: 11:00 - 15:00</p>
            </div>
            
         </div>
         </div>
      </section>
      <section>
      <div className="form-container">
        <div className="form-title">
            <h1 >Send us a message!</h1>
        </div>
        <div  className="contact-card1">
          <form onSubmit={handleSubmit} encType="text/plain">
            <label>First Name <span  className="imp">*</span></label><br/>
            
            <input type="text" name="FirstName" value={formValues.FirstName} onChange={handleChange} required="required"/><br/>
            <label >Last Name <span  className="imp">*</span></label><br/>
            <input type="text" name="LastName" value={formValues.LastName} onChange={handleChange} required="required"/><br/>
            
            <label>Email <span  className="imp">*</span></label><br/>
            <input type="email" name="Email" value={formValues.Email} onChange={handleChange} required="required"/><br/>
            <label>Message <span  className="imp">*</span></label><br/>
            <input type="text" name="Message" value={formValues.Message} onChange={handleChange} required="required"/><br/>
            <label>Additional Details</label><br/>
            <textarea name="addtional" value={formValues.Additional_message} onChange={handleChange}></textarea><br/>
            <button type="submit" id="csubmit">Send Message</button>
          </form>
          </div>
      </div>
      </section>

      <Footer/>
   
   </>
  )
}

export default Contact