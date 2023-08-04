import React from "react";
import { Box, Card, CardMedia, CardContent, Typography }from '@mui/material';

 function LandingCard(props){
  return (
    <div>
      <Card sx={{ display: "flex", justifyContent: "space-between", width: '90%', margin: "auto" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <CardContent>
            <Typography component="div" variant="h5">
              { props.feature }
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
      </Card>
    </div>
  )
}

export default LandingCard;