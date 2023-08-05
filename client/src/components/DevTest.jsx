import React from "react";

import TitleImage from "./TitleImage";
import HistoryList from "./HistoryList";
import CardList from "./CardList";

const programs = [
  {
    id: 1,
    name: 'Full Body Strength',
    description: 'A full-body weight training program to build strength and muscle.',
  },
  {
    id: 2,
    name: 'Upper Body Strength',
    description: 'A weight training program focused on building upper body strength.',
  },
  {
    id: 3,
    name: 'Lower Body Strength',
    description: 'A weight training program focused on building lower body strength and power.',
  },
  {
    id: 4,
    name: 'Strength and Hypertrophy',
    description: 'A weight training program designed for both strength and muscle hypertrophy.',
  },
  {
    id: 5,
    name: 'Strength and Power',
    description: 'A weight training program emphasizing strength and power development.',
  },
  {
    id: 6,
    name: 'Push-Pull Split',
    description: 'A weight training program that alternates between pushing and pulling exercises.',
  },
  {
    id: 7,
    name: 'Upper/Lower Split',
    description: 'A weight training program that divides workouts into upper and lower body sessions.',
  },
  {
    id: 8,
    name: '5x5 Stronglifts',
    description: 'A classic 5x5 weight training program for overall strength gains.',
  },
  {
    id: 9,
    name: 'Leg Hypertrophy',
    description: 'A weight training program aimed at building muscle hypertrophy in the legs.',
  },
  {
    id: 10,
    name: 'Upper Body Power',
    description: 'A weight training program focused on explosive upper body movements.',
  },
];

 function DevTest(){
  return (
    <div>
      <TitleImage />
      <HistoryList />
      <CardList cardData={programs}/>
    </div>
  )
}

export default DevTest;