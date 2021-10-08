import React from 'react';
import styles from './Navbar.module.css';
import { NavLink, Link } from 'react-router-dom';


const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.mainnavitems');
    const navLinks = document.querySelectorAll('.mainnavitems li');
    // <! burger.addEventListener('click', ()=>{ >
         //Toggle Nav
        nav.classList.toggle('navactive');

        //Animate Links
        navLinks.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation='';
            }else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
            }
        // <! }); >
        //Burger Animation
        burger.classList.toggle('toggle');
    });
}


const Navbar = () => {
    return (

    <React.Fragment>
        <header className={styles.main}>
            <nav className={styles.mainnav}>
                <div className={styles.mainlogo}>
                    <a href="/"><span>GAME &nbsp;</span>PARLOUR</a>
                </div>
                <div className={styles.name}>
                    <span>Welcome Name</span>
                </div>
                <ul className={styles.mainnavitems}>
                    <li className={styles.mainnavitem}><a href="/">Manage</a></li>
                    <li className={styles.mainnavitem}><a href="/">LogOut</a></li>
                   
                </ul>
                <div className={styles.burger} onClick={navSlide}>
                    <div className={styles.line1}></div>
                    <div className={styles.line2}></div>
                    <div className={styles.line3}></div>
                </div>
            </nav>
        </header>
        <section></section>
    </React.Fragment>
    )
}
export default Navbar