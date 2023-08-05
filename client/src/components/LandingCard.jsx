import React from "react";

 function LandingCard(props){
  const cardBodyClass = props.id % 2 ? "row flex-row-reverse g-0" : "row reverse g-0" ;
  const cardColorClass = props.id % 2 ? "card mx-auto border-dark bg-secondary" : "card mx-auto border-dark bg-dark" ;
  const textClass = props.id % 2 ? "p-3 text-end" : "p-3 text-start";
  
  const textCol = props.id % 2 ? "d-flex justify-content-end" : "d-flex justify-content-start";

  return (
    <div>
      <div className={cardColorClass} style={{ padding: 0}}>
        <div className={cardBodyClass} >
          <div className="col-md-4">
            <img src={props.image_source} className="img-fluid" style={{minHeight: "100%"}}alt="..." />
          </div>
          <div className="col-md-8">
            <div className={textClass}>
             <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold text-warning">{props.title}</h1>
              <p className="text-light">{ props.tagline }</p>
              <div className={textCol}>
                <p className="col-md-8 fs-4 text-white">{ props.description }</p>
              </div>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingCard;