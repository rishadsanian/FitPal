import React from 'react';
import { useState, useEffect } from 'react';

import CardList from '../CardList';
import CreateProgram from '../Programs/CreateProgram';
import axios from 'axios';

function ProgramsPage() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
      axios.get(`http://localhost:8080/programs/users/${window.sessionStorage.getItem('userId')}`).then((res) => {
        setPrograms(res.data.program);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-12 col-md-6 col-lg-7 col-xl-8">
          <CardList
            cardData={programs}
            title="Programs"
            path={`/programs/`}
          />
        </div>

        <div className="col col-12 col-md-6 col-lg-5 col-xl-4 bg-dark opacity-75 p-0 align-self-stretch" style={{ minHeight: '100vh' }} >
          <CreateProgram />
        </div>
      </div>
    </div>
  );
}

export default ProgramsPage;
