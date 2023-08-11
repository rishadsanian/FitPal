import React from 'react';
import Log from '../Dashboard/Log.jsx';
import { WorkoutProvider } from '../../contexts/WorkoutContext.js';

const LogPage = () => {
  return (
    <div className='bg-dark-50' style={{minHeight: '100vh'}}>
      <WorkoutProvider>
        <Log/>
      </WorkoutProvider>
    </div>
  );
};

export default LogPage;
