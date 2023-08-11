import moment from "moment";
import { useRef, useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Slider.css";
import { useWorkoutContext } from "../../contexts/WorkoutContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import { userContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";

const daysOfWeek = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday"
}

const MUSCLE_ICON = {
  abdominals: "fa-child-reaching",
  abductors: "fa-drumstick-bite",
  adductors: "fa-drumstick-bite",
  biceps: "fa-dumbbell",
  calves: "fa-drumstick-bite",
  chest: "fa-child-reaching",
  forearms: "fa-dumbbell",
  glutes: "fa-dumbbell",
  hamstrings: "fa-drumstick-bite",
  lats: "fa-child-reaching",
  lower_back: "fa-child-reaching",
  middle_back: "fa-child-reaching",
  neck: "fa-user-xmark",
  quadriceps: 'fa-drumstick-bite',
  traps: "fa-child-reaching",
  triceps: "fa-dumbbell",
};

//each slider item from mock data - could be moved to a different component
const SliderItem = ({ exercise, date, icon, workoutHistory, sets, profile }) => {
  console.log(workoutHistory);
  const navigate = useNavigate();

  const { userId } = useContext(userContext)

  const uniqueExerciseNames = [
    ...new Set(workoutHistory.map((workout) => workout.exercise_name))]
  // console.log("Unique Exercises from workout history", uniqueExerciseNames);
  const [uniqueExercises, setUniqueExercises] = useState(workoutHistory.filter(workout => workout.exercise_name === exercise));
  const [currentSets, setCurrentSets] = useState(sets.filter((set) => exercise === set.name));

  useEffect(() => {
    setUniqueExercises(workoutHistory.filter(workout => workout.exercise_name === exercise))
  }, [workoutHistory.length]);

  const exerciseIcon = "excercise-icon fa-solid " + MUSCLE_ICON[currentSets[0].muscle_group]; 

  const navigateToSession = () => {
    console.log(currentSets[0])
    const setReference = currentSets[0];
    const programId = setReference.program_id;
    const programUserId = setReference.user_id;
    const sessionId = setReference.session_id;
    if(userId === programUserId){
      navigate(`/programs/${programId}/sessions/${sessionId}`);
    } else {
      navigate(`/programs/${programId}/sessions/${sessionId}/noedit`);
    }
  }

  return (
    <div className="slider-item bg-dark border-warning mx-3">
      <div className="excercise-image">
        <i className={exerciseIcon}></i>
      </div>
      <h3 className="exercise text-warning">{exercise}</h3>
      <h3 className="exercise text-warning">{currentSets[0].muscle_group}</h3>
      <div>
        <div>
          {currentSets.map(set => 
          <div className="badge text-bg-light mx-2">
            <span>{set.resistant} lbs/{set.reps} Reps</span>
          </div>
          )}
        </div> 
        {uniqueExerciseNames.includes(exercise) && (
          <div>
            {uniqueExercises.filter((set) => exercise === set.exercise_name).map(set => 
            <div className="badge text-bg-warning mx-2">
              <span>{set.resistance} lbs/{set.reps} Reps</span>
            </div>)}
          </div>
        )}
        <button className="text-warning btn border-warning mt-3" onClick={navigateToSession}>
          <i className="fa-solid fa-eye"></i>
        </button>
        
      </div>
    </div>
  );
};

//---------------------------------------------------------------------------//

//main component
const SliderComponent = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const [userExercises, setUserExercises] = useState([]);
  const [sets, setSets] = useState([]);
  const [dailySession, setDailySession] = useState({})

  // USE CONTEXT
  const { profile, fetchProfile } = useProfileContext();
  const { workoutHistory, fetchWorkoutHistory } = useWorkoutContext();

  useEffect(() => {
    fetchWorkoutHistory();
    fetchProfile();
  }, []);

  useEffect(() => {
    let exerciseList = []; //needs to be a state
    if (profile.program_id) {
      axios.get(`http://localhost:8080/sets/program/${profile.program_id}/day/${moment().day() - 1}`).then((res) => {
        setSets(res.data.sets);
        //Set up the list of exercises from sets
        for (const set of res.data.sets) {
          
          if (
            !exerciseList
              .map((exercise) => exercise.name)
              .includes(set.name)
          ) {
            exerciseList.push({ name: set.name, day_of_week: set.day_of_week });
          }
        }
      });
      setUserExercises(exerciseList);
    }

    if (profile.program_id) {
      axios.get(`http://localhost:8080/sessions/program/${profile.program_id}/day/${moment().day() - 1}`).then((res) => {
        setDailySession(res.data.session)
      });
    }
  }, [profile.user_id]);


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
    slidesToShow: 1,
    // slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  //current day as day of week
  const currentDate = moment();
  // const dayOfWeek = currentDate.format("ddd");

  return (
    <div>
      {!profile.program_id ? 
      <div className="slider-container bg-dark p-5">
        <h2 className="slider-title text-warning">No program selected</h2>
      </div>
      :
      <div className=" slider-container bg-dark p-5">
        {dailySession && <h2 className="slider-title text-warning">{dailySession.name}</h2>}
        <h2 className="slider-title text-warning">{daysOfWeek[moment().day() - 1]}</h2>
        {!userExercises.length && <h2 className="slider-title text-warning">No exercises listed for todays program</h2>}
        <Slider {...settings}>
          {userExercises.length  && userExercises.map((workout, index) => (

            <SliderItem
              key={index}
              exercise={workout.name}
              // exercise={workout.exercise}
              date={workout.day_of_week}
              icon={workout.icon}
              workoutHistory={workoutHistory}
              sets={sets}
              profile={profile}
            />
          ))}
        </Slider>
      </div>}
    </div>
  );
};

export default SliderComponent;
