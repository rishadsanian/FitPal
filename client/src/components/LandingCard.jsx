import React from "react";

 function LandingCard(props){
  const cardBodyClass = props.id % 2 ? "row flex-row-reverse g-0" : "row reverse g-0"
  const roundedImageClass = props.id % 2 ? "img-fluid rounded-start" : "img-fluid rounded-start";
  return (
    <div>
      <div className="card mx-auto mt-4 mb-4" style={{ width: "90%"}}>
        <div className={cardBodyClass}>
          <div className="col-md-4">
            <img src={props.image_source} className={roundedImageClass} style={{minHeight: "100%"}}alt="..." />
          </div>
          <div className="bg-dark text-white col-md-8">
            <header className ="card-header"> 
              <h5 className="card-title">{props.title}</h5>
            </header>
            <div className="card-body">

              <p className="card-text">{ props.tagline }</p>
              <p className="card-text">{ props.description }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingCard;