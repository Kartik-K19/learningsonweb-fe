import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/event.css'
import Footer from '../components/Footer'


function Event() {
  return (
    <>
        
        <section className="event-class">
        
      <div className="ev-container">
        <div className='event-left'>
           
            <h1>Events</h1>

        </div>
        </div>
    </section>

    <section className='ev-body'>
        <div className='ev-body-head'>
            <a>Happening</a><div className="vertical-line"></div>
            <a>Upcoming</a><div className="vertical-line"></div>
            <a>Expired</a>
           
        </div>
        <hr />
    </section>

    <section className='event-section'>
      <div className='event-container'>
      
      <div className='event-body'>
        <div className='e-body-left'>
          <h1>30</h1>
          <p>September</p>
        </div>
        <div className='e-body-center'>
            <h1>Applying Natural Laws to Technology and Society</h1>
            <span>8:00 AM - 5:00 PM CHENNAI, INDIA</span>
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
      <hr/>
      <div className='event-body'>
        <div className='e-body-left'>
          <h1>19</h1>
          <p>July</p>
        </div>
        <div className='e-body-center'>
            <h1>Autumn Science Lectures</h1>
            <span> 8:00 AM - 5:00 PM  Mumbai, INDIA</span>
            <p>At our Autumn Science Lectures, we offer a variety of lectures to the public that cover a wide range of topics in science.</p>
        </div>
        <div className='e-body-right'>
          <img src={require('../images/event.jpg')} alt='image'/>
        </div>

      </div>

      
      </div>
    </section>
    <Footer/>
   
    </>
  )
}

export default Event