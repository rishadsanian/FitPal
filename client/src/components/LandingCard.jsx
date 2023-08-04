import React from "react";

 function LandingCard(props){
  const cardBodyClass = props.id % 2 ? "row flex-row-reverse g-0" : "row reverse g-0" ;
  return (
    <div>
      <div className="card mx-auto mt-4 mb-4" style={{ width: "90%", padding: 0}}>
        <div className={cardBodyClass} >
          <div className="col-md-4">
            <img src={props.image_source} className="img-fluid rounded" style={{minHeight: "100%"}}alt="..." />
          </div>
          <div className="bg-light col-md-8">
            <header className ="card-header"> 
              <h2 className="card-title">{props.title}</h2>
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