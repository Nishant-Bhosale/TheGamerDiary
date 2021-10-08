import React from 'react';
import styles from './Navbar.module.css';
import { NavLink, Link } from 'react-router-dom';


const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.main-nav-items');
    const navLinks = document.querySelectorAll('.main-nav-items li');
    // <!-- burger.addEventListener('click', ()=>{ -->
         //Toggle Nav
        nav.classList.toggle('nav-active');

        //Animate Links
        navLinks.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation='';
            }else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
            }
        // <!-- }); -->
        //Burger Animation
        burger.classList.toggle('toggle');
    });
}


const Navbar = () => {
    return (

    <React.Fragment>
        <header className="main">
            <nav className="main-nav">
                <div className="main-logo">
                    <a href="#"><span>GAME &nbsp;</span>PARLOUR</a>
                </div>
                <div className="name">
                    <span>Welcome Name</span>
                </div>
                <ul className="main-nav-items">
                    <li className="main-nav-item"><a href="#">Manage</a></li>
                    <li className="main-nav-item"><a href="#">LogOut</a></li>
                </ul>
                <div className="burger" onClick={navSlide}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        </header>
        <section></section>
    </React.Fragment>
    )
}
export default Navbar