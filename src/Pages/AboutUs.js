import React from 'react'
import Title from '../components/Title'
import '../styles/aboutUs.css';
import Footer from '../components/Footer';

function AboutUs() {
  return (
   <>
    <Title title="About Us"/>

    <section>
      <div className='about-head'>
     <h1>Learn with passion to live with purpose.</h1>
     
     </div>
    </section>
    <section className='about-cards'>
        <div className='about-card-container'>

      <div className="about-card">
            <img src={require('../images/About/globe.png')} alt='experience'/>
            <div className='about-card-head'><h2>3</h2></div>
            <div className="about-card-content">
            <p>Followers</p>
            </div>
            
         </div>
         <div className="about-card">
         <img src={require('../images/About/board.png')} alt='quiz'/>
            <div className='about-card-head'><h2>10</h2></div>
            <div className="about-card-content">
           
            <p>Classes Complete</p>
            </div>
            
         </div>
         <div className="about-card">
         <img src={require('../images/About/employee.png')} alt='chat'/>
            <div className='about-card-head'><h2>6</h2></div>
            <div className="about-card-content">
           
            <p>Students Enrolled</p>
            </div>
            
         </div>
         <div className="about-card">
         <img src={require('../images/About/graduated.png')} alt='chat'/>
            <div className='about-card-head'><h2>3</h2></div>
            <div className="about-card-content">
            
            <p>Certified Teachers</p>
            </div>
            
         </div>
         </div>
      </section>
      <section className='special'>
      <div className='special-head'>
      <h1>What Makes us Special?</h1>
     
    </div>
          
  <div className='special-card-container'>
  

    <div className="special-card">
          <img src={require('../images/About/about1.jpg')} alt='experience'/>
          <div className='special-card-head'><h2>Who we are</h2></div>
          <div className="special-card-content">
          <p>The e-learning website is to provide a comprehensive and accessible platform for individuals to acquire knowledge, develop skills, and enhance their educational journey through online learning.</p>
          </div>
          
      </div>
      <div className="special-card">
      <img src={require('../images/About/about2.jpg')} alt='quiz'/>
          <div className='special-card-head'><h2>What do we do</h2></div>
          <div className="special-card-content">
          
          <p>Our platform offers a wide range of courses and learning materials that cater to diverse interests, disciplines, and skill levels.</p>
          </div>
          
      </div>
      <div className="special-card">
      <img src={require('../images/About/about3.jpg')} alt='chat'/>
          <div className='special-card-head'><h2>How it works</h2></div>
          <div className="special-card-content">
          <p>Our user-friendly interface makes navigation intuitive and seamless. You can track your progress, participate in interactive quizzes and assignments, and collaborate with fellow learners through discussion forums.</p>
          
          </div>
      
      </div>
   </div>


      </section>


      <Footer/>
   </>
  )
}

export default AboutUs