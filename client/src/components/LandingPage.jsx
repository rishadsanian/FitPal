import React from "react";
import { Box }from '@mui/material';
import HeroImage from "./HeroImage";
import LandingCard from "./LandingCard";

export default function LandingPage(){
  return (
    <div>
      <HeroImage />
      <LandingCard 
        feature={"Feature 1"}
        feature_tag={"Feature Tagline"}
        feature_text={"Feature text"}
      />
      <LandingCard 
        feature={"Workout Tracking"}
        feature_tag={"Feature Tagline"}
        feature_text={"Fit Pal allows users to effortlessly track their sets and reps during daily workout sessions. It provides an intuitive interface to record exercise details, weights used, and the number of repetitions performed. Users can easily refer back to their workout history and monitor their progress over time."}
      />
    </div>
  )
}