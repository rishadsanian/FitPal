import React from "react";
import { Box, Card, CardMedia, CardContent, Typography }from '@mui/material';

 function LandingCard(props){
  return (
    <div>
      <div className="card mt-4 mb-4" style={{ width: "90%", margin: "auto"}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg" className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.feature}</h5>
              <p className="card-text">{ props.feature_tag }</p>
              <p className="card-text">{ props.feature_text }</p>
            </div>
          </div>
        </div>
      </div>
      {/* <Card sx={{ display: "flex", justifyContent: "space-between", width: '90%', margin: "auto" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <CardContent>
            <Typography component="div" variant="h5">
              props.feature
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              { props.feature_tag }
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div">
              { props.feature_text }
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: "50%", padding: 2 }}
          image="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
          alt="Workout Picture"
        />
      </Card> */}
    </div>
  )
}

export default LandingCard;