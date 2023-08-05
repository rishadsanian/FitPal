import SessionItem from '../Sessions/SessionItem';
import CardList from '../CardList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
          

const sessions = [
  {
    id: 1,
    program_id: 1,
    name: "Compound Power Lifts",
    description: "This full body strength workout focuses on compound movements like squats, deadlifts, and bench presses to target major muscle groups and build overall strength.",
  },
  {
    id: 2,
    program_id: 1,
    name: "Bodyweight Blast",
    description: "In this session, you'll perform a variety of bodyweight exercises such as push-ups, lunges, and planks to improve strength and build muscular endurance.",
  },
  {
    id: 3,
    program_id: 1,
    name: "Resistance Band Rumble",
    description: "The third workout includes a mix of free-weight and resistance band exercises to challenge your strength and stability, incorporating exercises like bicep curls, rows, and lateral raises.",
  },
  {
    id: 4,
    program_id: 1,
    name: "Full Body Circuit",
    description: "Get ready for a challenging session with this high-intensity full body strength circuit workout, including kettlebell swings, box jumps, and medicine ball slams.",
  },
  {
    id: 5,
    program_id: 1,
    name: "Functional Strength Fusion",
    description: "This workout incorporates functional training movements using kettlebells and dumbbells for overall strength development, combining movements like Turkish get-ups, farmer's carries, and goblet squats.",
  },
  {
    id: 6,
    program_id: 2,
    name: "Bench Press Mastery",
    description: "Focus on building a powerful and well-defined chest with various bench press variations and accessory exercises.",
  },
  {
    id: 7,
    program_id: 2,
    name: "Back and Biceps Blast",
    description: "This session targets the back and biceps muscles with exercises like pull-ups, rows, and bicep curls for a strong and sculpted upper body.",
  },
  {
    id: 8,
    program_id: 2,
    name: "Shoulder Strength Builder",
    description: "Strengthen your shoulders and improve posture with a mix of overhead presses, lateral raises, and rear delt flyes.",
  },
  {
    id: 9,
    program_id: 2,
    name: "Arm Pump Intensity",
    description: "Isolate and pump up those arm muscles with a focus on triceps and biceps exercises to create impressive arm definition.",
  },
];

const ProgramDetail = () => {
  const [program, setProgram] = useState([]);

  const {program_id} = useParams();

  const currentSessions = sessions.filter((session) => session.program_id === Number(program_id)) 

  useEffect(() => {
    // axios.get
  });

  return (
    <div>
      <div class="p-3 text-start bg-dark opacity-75">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold text-warning">{program.name}</h1>
          <p class="col-md-8 fs-4 text-white">{program.description}</p>
        </div>
      </div>
      <CardList cardData={currentSessions} title="Sessions" path={`/programs/${program_id}/sessions/`}/>
      {/* <div>
        <h1 className="fw-bold text-white pt-5">Session List</h1>
        <div className="px-4 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
          <SessionItem />
          <SessionItem />
          <SessionItem />
          <SessionItem />
          <SessionItem />
        </div>
      </div> */}
    </div>
  );
};

export default ProgramDetail;
