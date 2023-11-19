import React from 'react'
import { NavLink } from 'react-router-dom'
import './homeStyle.css'

export default function Home() {


  return (
    <section className='home'>
      <div className='home-content'>
        <h1>We help patients live a healthy, longer life.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit possimus corporis facere iste</p>
        <NavLink className="navlink" to={"/doctors"}>
          <button className="button-login"><span className="text">Make an appointment</span></button>
            </NavLink>
      </div>
    </section>

)
}
