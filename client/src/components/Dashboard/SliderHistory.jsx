import moment from "moment";
import { useRef, useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Slider.css";
import { useWorkoutContext } from "../../contexts/WorkoutContext";
import { ProfileContext, useProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";



// const currentDate = moment();
// const startDate = moment(currentDate)
//   .startOf("isoWeek")
//   .format("MMM D, YYYY");
// const endDate = moment(currentDate).endOf("isoWeek").format("MMM D, YYYY");
//mock data


//each slider item from mock data - could be moved to a different component
// const SliderItem = ({ exercise, date, icon }) => {
  
//   return (
//     <div className="slider-item bg-dark border-warning mx-3">
//       <div className="excercise-image">
//         <i className="excercise-icon fa-solid fa-dumbbell"></i>
//       </div>
//       <h3 className="exercise text-warning">{exercise}</h3>
//       <p className="date text-light">{moment(date).format("dddd, MMMM D")}</p>
//     </div>
//   );
// };

// //--------------------------------------------------------------------------//
// //main component
// const SliderComponent = () => {
//   const windowSize = useRef([window.innerWidth, window.innerHeight]);


//   // const { userId } = useProfileContext();






//   const getSlidesToShow = (windowWidth) => {
//     if (windowWidth <= 540) {
//       return 1;
//     } else if (windowWidth <= 720) {
//       return 2;
//     } else if (windowWidth <= 960) {
//       return 3;
//     } else {
//       return 4;
//     }
//   };

//   const [slidesToShow, setSlidesToShow] = useState(
//     getSlidesToShow(windowSize.current[0])
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       const newWindowWidth = window.innerWidth;
//       if (windowSize.current[0] !== newWindowWidth) {
//         windowSize.current[0] = newWindowWidth;
//         const newSlidesToShow = getSlidesToShow(newWindowWidth);
//         setSlidesToShow(newSlidesToShow);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="slider-container bg-dark p-5">
//       <h2 className="slider-title text-warning">Program Schedule</h2>
//       <Slider {...settings}>
//         {exerciseList.map((exercise, index) => (
//           <SliderItem
//             key={index}
//             exercise={exercise.name}
//             // day={workout.date}
//             // icon={workout.icon}
//           />
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default SliderComponent;
