import React,{useState,useEffect} from "react";
import Title from "../components/Title";
import '../styles/teacher.css'
import Footer from "../components/Footer";
import { API } from "../constant";
import { getToken } from "../helpers";

function BecomeTeacher() {
  const [formValues, setFormValues] = useState({
    FirstName: '',
    LastName:'',
    Email: '',
    Designation:'',
    Phone:'',
    message:'',
    about:''
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
      const response = await fetch(`${API}/instructor-forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}` 
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
      Designation:'',
      Phone:'',
      message:'',
      about:''
    });
  };


  return (
    <>
      <Title title="Become a Teacher" />

      <section>
        <div className="teach-head">
          <h1>Apply As Instructor</h1>

          <p>
          Lorem ipsum dolor sit amet, consectetur
          </p>
        </div>

        <div className="teach-content">

            <p>Lid est laborum dolo rumes fugats untras. Etharums ser quidem rerum facilis dolores nemis omnis fugats vitaes nemo minima rerums unsers sadips amets. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
            <img src={require("../images/Teacher/main.jpg")} alt="img" />
        </div>
      </section>

      <section className="teacher">
      <div className="teach-head">
          <h1>How to become a teacher</h1>

          <p>
          Lorem ipsum dolor sit amet, consectetur
          </p>
        </div>
        <div className="teacher-form">
            
        <form onSubmit={handleSubmit} encType="text/plain">
        <h4>Fill in your information and send it to us to become a teacher.</h4>
            <label>First Name <span  className="imp">*</span></label><br/>
            
            <input type="text" name="FirstName" value={formValues.FirstName}  required="required" onChange={handleChange}/><br/>
            <label>Last Name <span  className="imp">*</span></label><br/>
            
            <input type="text" name="LastName" value={formValues.LastName} required="required" onChange={handleChange}/><br/>
            <label >Email <span  className="imp">*</span></label><br/>
            <input type="email" name="Email" value={formValues.Email} required="required" onChange={handleChange}/><br/>
          
            
            <label>Phone <span  className="imp">*</span></label><br/>
            <input type="phone" name="Phone" required="required" value={formValues.Phone} onChange={handleChange}/><br/>
            
            <label>Designation <span  className="imp">*</span></label><br/>
            <input type="text" name="Designation" value={formValues.Designation}  required="required" onChange={handleChange}/><br/>
            <label>Message <span  className="imp">*</span></label><br/>
            <input type="text" name="message" value={formValues.message} required="required" onChange={handleChange}/><br/>
            <label>About<span  className="imp">*</span></label><br/>
            <textarea type="text" name="about" value={formValues.about} required="required" onChange={handleChange}/><br/>
            <button type="submit" id="tsubmit">Submit</button>
          </form>
        </div>


      </section>

      <Footer/>
    </>
  );
}

export default BecomeTeacher;
