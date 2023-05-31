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
     <p>Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper aucto.</p>
     </div>
    </section>
    <section className='about-cards'>
        <div className='about-card-container'>

      <div className="about-card">
            <img src={require('../images/About/globe.png')} alt='experience'/>
            <div className='about-card-head'><h2>45632</h2></div>
            <div className="about-card-content">
            <p>Followers</p>
            </div>
            
         </div>
         <div className="about-card">
         <img src={require('../images/About/board.png')} alt='quiz'/>
            <div className='about-card-head'><h2>1125</h2></div>
            <div className="about-card-content">
           
            <p>Classes Complete</p>
            </div>
            
         </div>
         <div className="about-card">
         <img src={require('../images/About/employee.png')} alt='chat'/>
            <div className='about-card-head'><h2>4653</h2></div>
            <div className="about-card-content">
           
            <p>Students Enrolled</p>
            </div>
            
         </div>
         <div className="about-card">
         <img src={require('../images/About/graduated.png')} alt='chat'/>
            <div className='about-card-head'><h2>34</h2></div>
            <div className="about-card-content">
            
            <p>Certified Teachers</p>
            </div>
            
         </div>
         </div>
      </section>
      <section className='special'>
      <div className='special-head'>
      <h1>What Makes us Special?</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisc ing elit.</p>
    </div>
          
  <div className='special-card-container'>
  

    <div className="special-card">
          <img src={require('../images/About/about1.jpg')} alt='experience'/>
          <div className='special-card-head'><h2>Who we are</h2></div>
          <div className="special-card-content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          
      </div>
      <div className="special-card">
      <img src={require('../images/About/about2.jpg')} alt='quiz'/>
          <div className='special-card-head'><h2>What do we do</h2></div>
          <div className="special-card-content">
          
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          
      </div>
      <div className="special-card">
      <img src={require('../images/About/about3.jpg')} alt='chat'/>
          <div className='special-card-head'><h2>How it works</h2></div>
          <div className="special-card-content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          
          </div>
      
      </div>
   </div>


      </section>


      <Footer/>
   </>
  )
}

export default AboutUs