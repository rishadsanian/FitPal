import React from "react";

 function LandingCard(props){
  const cardBodyClass = props.id % 2 ? "row flex-row-reverse g-0" : "row reverse g-0" ;
  const cardColorClass = props.id % 2 ? "card mx-auto border-dark bg-secondary" : "card mx-auto border-dark bg-dark" ;
  return (
    <div>
      <div className={cardColorClass} style={{ padding: 0}}>
        <div className={cardBodyClass} >
          <div className="col-md-4">
            <img src={props.image_source} className="img-fluid" style={{minHeight: "100%"}}alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title text-warning">{props.title}</h2>
              <p className="card-text text-light">{ props.tagline }</p>
              <p className="card-text text-light">{ props.description }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingCard;