import React from 'react';
import WorkoutForm from '../Log/WorkoutForm.jsx';
import WorkoutHistory from '../Log/WorkoutHistory.jsx';

const Log = () => {
  return (
    <div className="log">
      <div className="row row-sm-12 row-md-2">
        <div className="col col-sm-12 col-md-6 p-5 bg-dark">
          <WorkoutHistory />
        </div>
        <div className="col col-sm-12 col-md-6 p-5 bg-dark-50">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Log;
