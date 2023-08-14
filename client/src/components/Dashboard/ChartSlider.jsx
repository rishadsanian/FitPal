import React from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Slider.css";
import WeightTracker from "./WeightTracker";
import ChartWorkout from "./ChartWorkout";

const ChartSlider = () => {
  // // Slick settings
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <div className="container mt-5">
      {/* <Slider {...settings}> */}
      <div>
        <ChartWorkout />
      </div>
      <div>
        <WeightTracker />
      </div>
      {/* </Slider> */}
    </div>
  );
};

export default ChartSlider;
