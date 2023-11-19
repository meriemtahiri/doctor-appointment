import React from 'react'
import { NavLink } from 'react-router-dom'
import './footerStyle.css'

export default function Footer() {
  return (
    <footer className="footer">
  	 <div className="content">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><NavLink className="link" to={"/"}>about us</NavLink></li>
  	 				<li><NavLink className="link" to={"/"}>our services</NavLink></li>
  	 				<li><NavLink className="link" to={"/"}>privacy policy</NavLink></li>
  	 				<li><NavLink className="link" to={"/"}>affiliate program</NavLink></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>get help</h4>
  	 			<ul>
  	 				
  	 				<li><NavLink className="link" to={"/"}>FAQ</NavLink></li>
					<li><NavLink className="link" to={"/"}>payment options</NavLink></li>
  	 				<li><NavLink className="link" to={"/"}>shipping</NavLink></li>
  	 				<li><NavLink className="link" to={"/"}>returns</NavLink></li>
  	 				<li><NavLink className="link" to={"/"}>returns</NavLink></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Contact Us</h4>
  	 			<ul>
				   <li><NavLink className="link" to={"mailto:meryemtahiri@gmail.com"}>in e-mail</NavLink></li>
  	 				<li><NavLink className="link" to={"tel:+1234567890"}>in the phone</NavLink></li>
  	 				<li><NavLink className="link" to={"https://goo.gl/maps/Fnp11uZc6m2vPTf9A"} target="_blank">location</NavLink></li>
  	 				<li><NavLink className="link" to={"/"}>affiliate program</NavLink></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>follow us</h4>
  	 			<div className="social-links">
				   <NavLink className="link" to={"/"}><i className="fab fa-facebook-f"></i></NavLink>
				   <NavLink className="link" to={"/"}><i className="fab fa-twitter"></i></NavLink>
				   <NavLink className="link" to={"/"}><i className="fab fa-instagram"></i></NavLink>
				   <NavLink className="link" to={"/"}><i className="fab fa-linkedin-in"></i></NavLink>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
  )
}
