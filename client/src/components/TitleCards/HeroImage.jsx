import React from "react";
import "../../styles/HeroImage.css";

 function HeroImage(){
  return (
    <div height="400" width="100%">
      <img className="hero-image object-fit-cover" alt="hero" height="400" width="100%" src="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"/>
      
      {!window.sessionStorage.getItem('isAuthenticated') && (
        <div>

          <span
            className="hero-image-logo navbar-brand p-3 text-white text-start"
            style={{ fontFamily: 'Bebas Neue'}}
          >
            Get Fit! <br/>
            Get Strong! <br/>
            Get Healthy!
          </span>
          <a href="/login" className="hero-image-button btn btn-warning fw-bold opacity-75 text-dark">
            Get Started
          </a>
        </div>
      )}
    </div>
    
  )
}

export default HeroImage;