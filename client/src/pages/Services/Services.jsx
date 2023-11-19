import React from 'react'
import { Link } from 'react-router-dom';
import './servicesStyle.css'

export default function Services() {
  return (
    <div className="services-container">

    <div className="box-container">

        <div className="box">
            <img src="image/icon-1.png" alt="" />
            <h3>Medical Consultations</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
            <Link to={"/"} className="btn">read more</Link>
        </div>

        <div className="box">
            <img src="image/icon-2.png" alt="" />
            <h3>Medical Examinations</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
            <Link to={"/"} className="btn">read more</Link>
        </div>

        <div className="box">
            <img src="image/icon-3.png" alt="" />
            <h3>Dermatology Services</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
            <Link to={"/"} className="btn">read more</Link>
        </div>

        <div className="box">
            <img src="image/icon-4.png" alt="" />
            <h3>Radiology Services</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
            <Link to={"/"} className="btn">read more</Link>
        </div>

        <div className="box">
            <img src="image/icon-5.png" alt="" />
            <h3>Radiology Services</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
            <Link to={"/"} className="btn">read more</Link>
        </div>

        <div className="box">
            <img src="image/icon-6.png" alt="" />
            <h3>Pediatric Care</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
            <Link to={"/"} className="btn">read more</Link>
        </div>

    </div>

</div>
  )
}
