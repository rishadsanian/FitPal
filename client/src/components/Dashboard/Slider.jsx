/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { LinearProgress } from "@mui/material";

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
  quadriceps: "fa-drumstick-bite",
  traps: "fa-child-reaching",
  triceps: "fa-dumbbell",
};

//each slider item from mock data - could be moved to a different component
const SliderItem = ({
  exercise,
  date,
  icon,
  workoutHistory,
  sets,
  profile,
}) => {
  const navigate = useNavigate();

  const { userId } = useContext(userContext);

  const uniqueExerciseNames = [
    ...new Set(workoutHistory.map((workout) => workout.exercise_name)),
  ];

  const [uniqueExercises, setUniqueExercises] = useState(
    workoutHistory.filter((workout) => workout.exercise_name === exercise)
  );

  const [currentSets, setCurrentSets] = useState(
    sets.filter((set) => exercise === set.name)
  );

  // const [userWorkouts, setUserWorkouts] = useState(
  //   uniqueExercises.filter((set) => exercise === set.exercise_name)
  // )

  useEffect(() => {
    setUniqueExercises(
      workoutHistory.filter((workout) => workout.exercise_name === exercise)
    );
  }, [workoutHistory.length]);

  const isDone =
    uniqueExercises.filter((set) => exercise === set.exercise_name).length >=
    currentSets.length;

  const getCompletionVal = () => {
    const percentComplete = uniqueExercises.filter((set) => exercise === set.exercise_name).length /
    currentSets.length * 100;
    if(percentComplete > 100) {
      return 100;
    } else {
      return percentComplete; 
    }
  }
  

  const exerciseIcon = MUSCLE_ICON[currentSets[0].muscle_group];

  const navigateToSession = () => {
    console.log(currentSets[0]);
    const setReference = currentSets[0];
    const programId = setReference.program_id;
    const programUserId = setReference.user_id;
    const sessionId = setReference.session_id;
    if (userId === programUserId) {
      navigate(`/programs/${programId}/sessions/${sessionId}`);
    } else {
      navigate(`/programs/${programId}/sessions/${sessionId}/noedit`);
    }
  };

  return (
    <div
      className={
        isDone
          ? "card bg-dark m-3 rounded border-warning border-3"
          : "card bg-dark m-3 rounded border-secondary border-3"
      }
    >
      {/* Logo icon */}

      <div className="card-header d-flex justify-content-center gap-2 align-items-center border-bottom">
        <i
          className={
            "bg-secondary p-3 rounded-circle text-warning fa-solid " +
            exerciseIcon
          }
        ></i>
        <h5 className="text-white card-title">{exercise}</h5>
        
      </div>
      
      <div className="card-body px-0">
        <p className="fw-bold text-white">Recomended: </p>
        {/* RECOMMENDED SETS */}
        <div className="d-flex flex-wrap gap-2 justify-content-center ps-3">
          {currentSets.map((set, index) => (
            <div key={index} className="badge text-bg-light">
              <span>
                {set.resistant} lbs/{set.reps} Reps
              </span>
            </div>
          ))}
        </div>

        {/* RECORD */}
        <div className="card-body border-top border-bottom border-white mt-3">
          <p className="fw-bold text-warning">
            {uniqueExercises.filter((set) => exercise === set.exercise_name)
              .length >= 1
              ? "Your Record:"
              : "Start your workout"}
          </p>
          {uniqueExerciseNames.includes(exercise) && (
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {uniqueExercises
                .filter((set) => exercise === set.exercise_name)
                .map((set, index) => (
                  <div key={index} className="badge text-bg-warning">
                    <span>
                      {set.resistance} lbs/{set.reps} Reps
                    </span>
                  </div>
                ))}
            </div>
          )}
          
        </div>
        <LinearProgress color="success" variant="determinate" value={getCompletionVal()}sx={{ width: "100%"}}/>
        <button
          className="text-warning btn btn-outline-warning mt-3"
          disabled={isDone}
          onClick={navigateToSession}
        >
          {isDone ? (
            <i class="fa-solid fa-check text-info"></i>
          ) : (
            <i className="fa-solid fa-plus text-white"></i>
          )}
        </button>
      </div>
    </div>
  );
};

//---------------------------------------------------------------------------//

//main component
const SliderComponent = () => {
  const windowSize = useRef([window.innerWidth]);

  const [userExercises, setUserExercises] = useState([]);
  const [sets, setSets] = useState([]);
  const [dailySession, setDailySession] = useState({});

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
      axios
        .get(
          `http://localhost:8080/sets/program/${profile.program_id}/day/${
            moment().isoWeekday() -1
          }`
        )
        .then((res) => {
          setSets(res.data.sets);
          //Set up the list of exercises from sets
          for (const set of res.data.sets) {
            if (
              !exerciseList.map((exercise) => exercise.name).includes(set.name)
            ) {
              exerciseList.push({
                name: set.name,
                day_of_week: set.day_of_week,
              });
            }
          }
        });
      setUserExercises(exerciseList);
    }

    if (profile.program_id) {
      axios
        .get(
          `http://localhost:8080/sessions/program/${profile.program_id}/day/${
            moment().isoWeekday() - 1
          }`
        )
        .then((res) => {
          setDailySession(res.data.session);
        });
    }
  }, [profile.user_id]);

  const getSlidesToShow = (windowWidth) => {
    if (windowWidth <= 845) {
      return 1;
    } else if (windowWidth < 1200) {
      return 2;
    } else {
      return 3;
    }
  };

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
        console.log(newWindowWidth);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow:
    userExercises.length < slidesToShow
      ? userExercises.length
      : slidesToShow,
    speed: 500,
    dots: true,
    
  };

  return (
    <div>
      {!profile.program_id ? (
        <div className="bg-dark p-5 border border-secondary border-3">
          <h2 className="slider-title text-warning">No program selected</h2>
          <span className="d-flex align-items-center justify-content-center p-3">
            <a href="/programs" className="text-decoration-none text-warning">
              <i className="circle-add-icon fas fa-plus-circle fa-3x"></i>
            </a>
          </span>
        </div>
      ) : (
        <div className="">
          {dailySession && (
            <h1 className="slider-title text-warning p-0">
              {dailySession.name}
            </h1>
          )}
          {!userExercises.length && (
            <h2 className="slider-title text-warning">
              No exercises listed for todays program
            </h2>
          )}
          <Slider {...settings}>
            {userExercises.length &&
              userExercises.map((workout, index) => (
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
        </div>
      )}
    </div>
  );
};

export default SliderComponent;
