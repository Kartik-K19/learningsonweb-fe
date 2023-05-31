import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/membership.css'
import Title from '../components/Title'

function Membership() {
 

  return (
    <>
        
       <Title title="Membership Levels"/>
	       
    <section className='member-section'>

        <div className="membership" id="membership_section">
			<h2 className="title">Set a plan, start learning and unlock your potential</h2>
			<div className="member-container">
				<div className="member-card">
					<h3>Basic</h3>
					<p>We are just getting started </p>
					<div className="price">₹29/month</div>
					<p>expires after 30 Days.</p>
					<a href="#" className="btn">Get It Now</a>
				</div>
				<div className="member-card">
					<h3>Medium</h3>
					<p>The most popular plan</p>
					<div className="price">₹99/month</div>
					<p>expires after 30 Days.</p>
					<a href="#" className="btn">Get It Now</a>
				</div>
                <div className="member-card">
					<h3>Advanced</h3>
					<p>The most popular plan</p>
					<div className="price">₹199/month</div>
					<p>expires after 30 Days.</p>
					<a href="#" className="btn">Get It Now</a>
				</div>
				<div className="member-card">
					<h3>Premium</h3>
					<p>Experience the best for e-learning</p>
					<div className="price">₹499/month</div>
					<p>expires after 30 Days.</p>
					<a href="#" className="btn">Get It Now</a>
				</div>
			</div>
			
		</div>
    </section>

    
        <Footer/>
    </>
  )
}

export default Membership