import React from "react";
import "../styles/TitleImage.css";

 function TitleImage(){
  return (
    <div>
      <div className="title-container" height="200">
        <img className="object-fit-cover" height="200" width="100%" src="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"/>
        <img className="overlay-icon" height="175" src="https://static.vecteezy.com/system/resources/previews/005/377/279/original/weight-icon-on-white-background-free-vector.jpg"/>
      </div>
    </div>
  )
}

export default TitleImage;