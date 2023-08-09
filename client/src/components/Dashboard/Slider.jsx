import moment from "moment";
import { useRef, useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Slider.css";
import { useWorkoutContext } from "../../contexts/WorkoutContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";

import ExerciseList from "../Exercises/ExerciseList";

//each slider item from mock data - could be moved to a different component
const SliderItem = ({ exercise, date, icon }) => {
  return (
    <div className="slider-item bg-dark border-warning mx-3">
      <div className="excercise-image">
        <i className="excercise-icon fa-solid fa-dumbbell"></i>
      </div>
      <h3 className="exercise text-warning">{exercise}</h3>
      <p className="date text-light">{moment(date).format("dddd, MMMM D")}</p>
    </div>
  );
};

//---------------------------------------------------------------------------//

//main component
const SliderComponent = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const [userExercises, setUserExercises] = useState();
  const { profile } = useProfileContext();
  const { workoutHistory, fetchWorkoutHistory } = useWorkoutContext();

  // const uniqueExerciseNames = [
  //   ...new Set(workoutHistory.map((workout) => workout.exercise.name)),
  
    const programId = profile.program_id;
    const programName = profile.name;
  
    let exerciseList = []; //needs to be a state
  // ];
  const recommendedSessionExercises = exerciseList.map(
    (exercise) => exercise.name
  );

  // console.log("programid in axios",programId);
  // useEffect(() => {
  //   axios.get(`http://localhost:8080/sets/program/${programId}`).then((res) => {
      
  //   //Set up the list of exercises from sets
      
  //     for (const set of res.data.sets) {
  //       if (
  //         !exerciseList
  //           .map((exercise) => exercise.name)
  //           .includes(set.exercise_name)
  //       ) {
  //         exerciseList.push({ name: set.exercise_name });
  //       }
  //     }
  //     setUserExercises(exerciseList);
  //   });
  // }, []);

  // const uniqueExercisesCompleted = workoutHistory.map((workout)=>{workout.exercise_name = })

  const getSlidesToShow = (windowWidth) => {
    if (windowWidth <= 540) {
      return 1;
    } else if (windowWidth <= 720) {
      return 2;
    } else if (windowWidth <= 960) {
      return 3;
    } else {
      return 4;
    }
  };

  //---------------------------------------------------------------------//

  const [slidesToShow, setSlidesToShow] = useState(
    getSlidesToShow(windowSize.current[0])
  );

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      if (windowSize.current[0] !== newWindowWidth) {
        windowSize.current[0] = newWindowWidth;
        const newSlidesToShow = getSlidesToShow(newWindowWidth);
        setSlidesToShow(newSlidesToShow);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    // slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  //current day as day of week
  const currentDate = moment();
  const currentDayOfWeek = (currentDate.day() + 6) % 7;



  return (
    <div className="slider-container bg-dark p-5">
      {/* <h2 className="slider-title text-warning">Program Schedule</h2> */}
      <Slider {...settings}>
        {/* {exerciseList.map((workout, index) => ( */}
          <SliderItem
            key={1}
            // exercise={workout.exercise}
            day={currentDayOfWeek}
            // icon={workout.icon}
          />
        {/* ))} */}
      </Slider>
    </div>
  );
};

export default SliderComponent;
