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
            <span>8:00 AM - 5:00 PM  NEWYORK, USA</span>
            <p>Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris itae erat conuat</p>
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
            <span> 8:00 AM - 5:00 PM  PARIS, FRENCH</span>
            <p>Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris itae erat conuat</p>
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
            <span> 8:00 AM - 5:00 PM  VENICE, ITALY</span>
            <p>Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris itae erat conuat</p>
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