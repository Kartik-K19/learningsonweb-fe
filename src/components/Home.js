import React,{useState, useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import img1 from '../images/pexels-armin-rimoldi-5553057.jpg'
import img2 from '../images/pexels-armin-rimoldi-5553727.jpg'
import img4 from '../images/quiz.png'
import img5 from '../images/chat.png'
import img6 from '../images/e3.jpg'
import Footer from './Footer'
import { Context } from '../Context/context'
import { API,BACKEND_URL} from '../constant'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

  const {user} = useContext(Context);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate()
  const makeApiCall = async ()=>{
    await fetch(`${API}/courses?populate=*`)
   .then((response) => response.json())
   .then((data) => setCourses(data.data));
   
 }

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
    else{
      toast.success('Message Sent', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  } catch (error) {
    toast.error('Some error occured', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  
  }
  setFormValues({
    FirstName: '',
    LastName:'',
    Email: '',
    Message:'',
    Additional_message:'',
  });
};


 useEffect(() => {
  makeApiCall();
  
}, []);


  return (
    <>
    
    <section className="banner">
      <div className="banner-slider">
        <div className="slide active">
          <img src={img1} alt="Slide 2"/>
        </div>
        <div className="slide">
          <img src={img2} alt="Slide 3"/>
        </div>
      </div>
      <div className="banner-content">
        <div className="hero">
          <h1>
            <span>Learn</span>
            <div className="message">
              <div className="word1">Anything</div>
              <div className="word2">Anytime</div>
              <div className="word3">Anywhere</div>
            </div>
          </h1>
          <p className="">Take your learning to the next level with our online courses.</p>
         {user? (<Link to="/courses" className="btn btn-secondary">Get Started</Link>):(<Link to="/login" className="btn btn-secondary">Get Started</Link>)}
        </div>
      </div>
    </section>

    
    <div className="featured-courses">
      <div className="feature-left">
        <h2>Popular Courses</h2>
        <p>Limitless learning, more possibilities</p>
      </div>
      
    </div>
   
    
      <div className="carousal-container">
        <div className="card-carousel">
          {courses.slice(0, 4).map((item)=>(
              <div className="card" key={item.id}>
              <img src={BACKEND_URL+item.attributes.Course_img.data.attributes.formats.thumbnail.url} alt="Card Image"/>
              <div className="card-content">
                <h6 className="card-title">{item.attributes.Title}</h6>
                <p className="card-description">{item.attributes.Course_description}</p>
                <div className='card-footer'><span>₹{item.attributes.Price}</span><button onClick={()=>navigate(`courses/${item.id}`)} className="card-button">Read More</button></div>
              </div>
            </div>
          ))}
          
         
          
        </div>
      </div>
      <div className='view-btn'>
        <button onClick={()=>navigate('/courses')}>VIEW MORE</button>
      </div>
   

    <section className="register-now">
        
      <div className="reg-container">
        <div className='reg-left'>
            <p>Get 100 of online courses for free</p>
            <h1>Register Now</h1>

        </div>
        <div className='reg-right'>
        
            <div className='card-head'><h2>Create your free account now and get access to 100s of online courses</h2></div>
            <div className="reg-card-content">
            
              
            <button onClick={()=>navigate('/register')} >Register &rarr;</button>
          
            </div>
            </div>
         </div>
        
    </section>
    <section className='why-choose-us'>
        <h1>Why Choose Us?</h1>
       <div className='why-container'>
        <div className="why-card">
            <img src={require('../images/experience.png')} alt='experience'/>
            <div className='why-card-head'><h2>Highly Experienced</h2></div>
            <div className="why-card-content">
            <p>An individual with extensive experience is one who has a broad base of knowledge and skills in a particular area and who has been involved in that area for a significant period of time.</p>
            </div>
            
         </div>
         <div className="why-card">
         <img src={img4} alt='quiz'/>
            <div className='why-card-head'><h2>Question, Quiz & Course</h2></div>
            <div className="why-card-content">
            <p>With a quiz-style course, students will receive feedback tailored to their needs by providing them with questions that are personalized to their learning preferences.</p>
            </div>
            
         </div>
         <div className="why-card">
         <img src={img5} alt='chat'/>
            <div className='why-card-head'><h2>Dedicated Support</h2></div>
            <div className="why-card-content">
            <p>Dedicated support is a type of customer service support in which customers receive individualized and personalized service and support from a dedicated team or individual.</p>
            </div>
            
         </div>
       </div>
    </section>

    <section className='event-section'>
      <div className='event-container'>
      <div className='event-head'>
        <div className='event-head-left'>
        <h1>Events</h1>
        <p>Upcoming Education Events to feed your brain.</p>
        </div>
        <div className='event-head-right'>
          <Link to="/events">VIEW ALL</Link>
        </div>
      </div>
      <hr/>
      <div className='event-body'>
        <div className='e-body-left'>
          <h1>30</h1>
          <p>September</p>
        </div>
        <div className='e-body-center'>
            <h1>Applying Natural Laws to Technology and Society</h1>
            <span>8:00 AM - 5:00 PM  CHENNAI, INDIA</span>
            <p>Applying natural laws to technology and society is an area of study that focuses on the use of physical and mathematical principles to develop solutions that help improve everyday life.</p>
        </div>
        <div className='e-body-right'>
          <img src={require('../images/event.jpg')} alt='image'/>
        </div>

      </div>
      <hr/>
      <div className='event-body'>
        <div className='e-body-left'>
          <h1>25</h1>
          <p>September</p>
        </div>
        <div className='e-body-center'>
            <h1>Managing Time for Study</h1>
            <span> 8:00 AM - 5:00 PM  DELHI, INDIA</span>
            <p>It can be overwhelming and challenging to fit in studying while also attending classes, participating in activities and taking care of regular responsibilities.</p>
        </div>
        <div className='e-body-right'>
          <img src={require('../images/event2.jpg')} alt='image'/>
        </div>

      </div>

      
      </div>
    </section>

    <section className='abt-section'>
    <div  className="diffSection" id="about_section">
		<h1>About</h1>
		<div  className="about-content">
				<div  className="side-image">
					<img  className="sideImage sideImage-appear" src={img6}/>
				</div>
				<div  className="side-text side-text-appear">
					<h2>What you think about us ?</h2>
					<p>Education is the process of facilitating learning, or the acquisition of knowledge, skills, values, beliefs, and habits. Educational methods include teaching, training, storytelling, discussion and directed research.<br/> Educational website can include websites that have games, videos or topic related resources that act as tools to enhance learning and supplement classroom teaching. These websites help make the process of learning entertaining and attractive to the student, especially in today's age. <br/>Using HTML(HyperText Markup Language), CSS(Cascading Style Sheet), JavaScript, we can make learning more easier and in a interesting way.</p>
				</div>
		</div>
	</div>
    </section>

   

    

    <section className='contact-section'> 
        <div  className="contact-container" id="contactus_section">
          <h1>Contact Us</h1>
        
          <div  className="contact-card">
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

export default Home