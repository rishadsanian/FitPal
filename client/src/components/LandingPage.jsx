import React from "react";
import { Box }from '@mui/material';
import HeroImage from "./HeroImage";
import LandingCard from "./LandingCard";

const featureData = [
  {
    id: 0,
    title: "Workout Tracking",
    tagline: "tagline",
    description: "Fit Pal allows users to effortlessly track their sets and reps during daily workout sessions. It provides an intuitive interface to record exercise details, weights used, and the number of repetitions performed. Users can easily refer back to their workout history and monitor their progress over time.",
    image_source: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg"
  },
  {
    id: 1,
    title: "Customizable Workout Programs",
    tagline: "tagline",
    description: "Fit Pal offers a diverse range of workout programs that users can choose from or customize to suit their individual preferences. Users can select the number of workout days per week, the number of exercises per day, and even specify their preferred exercise types, such as strength training, cardio, flexibility, or a combination of these.",
    image_source: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
  },
  {
    id: 2,
    title: "Personalized Exercise Recommendations",
    tagline: "tagline",
    description: "The app uses advanced algorithms to analyze user attributes, including body weight, fitness level, and workout history. Based on this information, Fit Pal will provide personalized exercise recommendations tailored to individual goals, such as muscle building, weight loss, or overall fitness improvement.",
    image_source: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"
  },
  {
    id: 3,
    title: "Analytics and Progress Visualization",
    tagline: "tagline",
    description: "Fit Pal presents users with detailed analytics and visualizations of their fitness journey. Users can track their performance trends, improvements, and areas for potential growth. The app will showcase data in charts and graphs, making it easier for users to interpret their progress.",
    image_source: "https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg?"
  }
]


export default function LandingPage(){
  const features = featureData.map(data =>
    <LandingCard 
      key={data.id} 
      id={data.id}
      title={data.title} 
      tagline={data.tagline} 
      description={data.description}
      image_source={data.image_source}
      image_left={data.image_left}
    />);

  return (
    <div>
      <HeroImage />
      {features}
    </div>
  )
}