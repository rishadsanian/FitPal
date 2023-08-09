import moment from 'moment';
import { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/Slider.css';

//mock data
const mockWorkouts = [
  {
    exercise: 'Push-ups',
    date: '2023-08-01',
    icon: 'https://example.com/push-ups-icon.png',
  },
  {
    exercise: 'Squats',
    date: '2023-08-02',
    icon: 'https://example.com/squats-icon.png',
  },
  {
    exercise: 'Pull-ups',
    date: '2023-08-03',
    icon: 'https://example.com/pull-ups-icon.png',
  },
  {
    exercise: 'Planks',
    date: '2023-08-04',
    icon: 'https://example.com/planks-icon.png',
  },
  {
    exercise: 'Burpees',
    date: '2023-08-05',
    icon: 'https://example.com/burpees-icon.png',
  },
];

//each slider item from mock data - could be moved to a different component
const SliderItem = ({ exercise, date, icon }) => {
  return (
    <div className="slider-item bg-dark border-warning mx-3">
      <div className="excercise-image">
        <i className="excercise-icon fa-solid fa-dumbbell"></i>
      </div>
      <h3 className="exercise text-warning">{exercise}</h3>
      <p className="date text-light">
        {moment(date).format('dddd, MMMM D')}
      </p>
    </div>
  );
};

//main component
const SliderComponent = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

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

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container bg-dark p-5">
      <h2 className="slider-title text-warning">Program Schedule</h2> 
      <Slider {...settings}>
        {mockWorkouts.map((workout, index) => (
          <SliderItem
            key={index}
            exercise={workout.exercise}
            date={workout.date}
            icon={workout.icon}
          />
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
