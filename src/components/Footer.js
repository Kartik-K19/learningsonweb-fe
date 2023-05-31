import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
        <div   className="footer-container">
			<div   className="left-col">
				
				<div   className="logo">Learnings on Web</div>
				<div   className="social-media">
					<a href="#"><img src={require('../images/Footer/fb.png')}/></a>
					<a href="#"><img src={require('../images/Footer/insta.png')}/></a>
					<a href="#"><img src={require('../images/Footer/tt.png')}/></a>
					<a href="#"><img src={require('../images/Footer/ytube.png')}/></a>
					<a href="#"><img src={require('../images/Footer/linkedin.png')}/></a>
				</div><br/><br/>
				<p   className="rights-text">Copyright © 2021 All Rights Reserved.</p>
				<br/><p><img src={require('../images/Footer/location.png')}/>Nagpur, Maharashtra-440024</p>
				<p><img src={require('../images/Footer/phone.png')}/> +91-1234-567-890<br/><img src={require('../images/Footer/mail.png')}/>&nbsp; kartiklonkar@gmail.com</p>
			</div>
			<div   className="right-col">
				<h1>Our Newsletter</h1>
				<div   className="border"></div><br/>
				<p>Enter Your Email to get our News and updates.</p>
				<form   className="newsletter-form">
					<input   className="txtb" type="email" placeholder="Enter Your Email"/>
					<input   className="btn" type="submit" value="Submit"/>
				</form>
			</div>
		</div>


    </footer>
  )
}

export default Footer