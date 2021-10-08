import React from 'react'
import "./Footer.css";

const Footer = () => {
    return (

    <React.Fragment>
          <footer>
    <div className={styles.content}>
      <div className={styles.top}>
        <div className={styles.main-logo}>
          <a href="#"><span>A</span>rcadian</a>
        </div>
        <div className={styles.media-icons}>
          <a href="/"><i className="fab fa-facebook" to="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"></i></a>
          <a href="/"><i className="fab fa-twitter" to="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"></i></a>
          <a href="/"><i className="fab fa-linkedin" to="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"></i></a>
          <a href="/"><i className="fab fa-youtube" to="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"></i></a>
          <a href="/"><i className="fab fa-instagram" to="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"></i></a>
        </div>
      </div>
    </div>
    <div className={styles.bottom-details}>
      <div className={styles.bottom_text}>
        <span className={styles.copyright_text}>Copyright © 2021 <hr></hr> <a href="#"><span>A</span>rcadian</a>All rights reserved</span>
        <span className={styles.policy_terms}>
          <a href="#">Privacy policy</a>
          <hr></hr>
          <a href="#">Terms & condition</a>
        </span>
      </div>
    </div>
  </footer>
    </React.Fragment>
    )
}
export default Navbar