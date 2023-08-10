import React from 'react';
import WorkoutForm from '../Log/WorkoutForm.jsx';
import WorkoutHistory from '../Log/WorkoutHistory';
import { WorkoutProvider } from '../../contexts/WorkoutContext';

const Log = () => {
  return (
    <div className="log bg-dark">
      <div className="row row-sm-12 row-md-2 p-3">
        <div className="col col-sm-12 col-md-6 col-lg-7 col-xl-8 p-3">
          <WorkoutHistory />
        </div>
        <div className="col col-sm-12 col-md-6 col-lg-5 col-xl-4 p-3">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Log;
