import React from "react";
import { Box, Card, CardMedia, CardContent, Typography }from '@mui/material';

 function LandingCard(props){
  return (
    <div>
      <div className="card mx-auto mt-4 mb-4" style={{ width: "90%"}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={props.image_source} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
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