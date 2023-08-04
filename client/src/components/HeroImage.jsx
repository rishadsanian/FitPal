import React from "react";
import { Box }from '@mui/material';

 function HeroImage(){
  return (
    <div>
      <Box
        component="img"
        sx={{
          objectFit: 'cover',
          height: 400,
          width: "100%",
        }}
        alt="Hero Image"
        src="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
      />
    </div>
  )
}

export default HeroImage;