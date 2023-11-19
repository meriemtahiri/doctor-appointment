import React from 'react'
import './contactStyle.css'
import img from './bg1.png'

export default function Contact() {
  return ( 
<div className="contact-form">
    <div className="form_container">
        <div className="main">
            <div className="form_content">
                <h2>Contact Us</h2>
                <form action="#" method="post">
                    <input type="text" name="name" placeholder="Enter Your Name" />
                    <input type="email" name="email" placeholder="Enter Your Email" />
                    <textarea name="message" placeholder="Your Message"></textarea>
                    <button type="submit" className="btn">
                        Send <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
            <div className="form-img">
                <img src={img} alt="" />
            </div>
        </div>
    </div>
</div>
  )
}
