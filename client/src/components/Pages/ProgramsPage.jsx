import React from 'react';
import { useState, useEffect } from 'react';

import CardList from '../CardList';
import CreateProgram from '../Programs/CreateProgram';
import axios from 'axios';

function ProgramsPage(props) {
  const [userPrograms, setUserPrograms] = useState([]);
  const [nonUserPrograms, setNonUserPrograms] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [currentProfile, setCurrentProfile] = useState();

  useEffect(() => {
    window.scrollTo({top:0, left:0});
    if(props.userView){
      axios.get(`http://localhost:8080/api/profile/${window.sessionStorage.getItem('userId')}`).then((res) => {
       setCurrentProfile(res.data);
      });
    }
      // Get program data and update appropriate lists
      axios.get(`http://localhost:8080/programs`).then((res) => {
        setUserPrograms(res.data.program.filter((program) => program.user_id === Number(window.sessionStorage.getItem('userId'))));
        setNonUserPrograms(res.data.program.filter((program) => program.user_id !== Number(window.sessionStorage.getItem('userId'))));
        setAllPrograms(res.data.program)
      });
      
  }, []);

  return (
    <div className="container-fluid">
      {props.userView ? <div className="row">
         
        <div className="col col-12 col-md-6 col-lg-7 col-xl-8">
          {userPrograms.length &&
          <CardList
            cardData={userPrograms}
            title="My Programs"
            path={`/programs/`}
            editable={true}
            userView={props.userView}
            currentProfile={currentProfile}
          />
          
          }
          <CardList
          cardData={nonUserPrograms}
          title="Public Programs"
          path={`/programs/`}
          editable={false}
          userView={props.userView}
          currentProfile={currentProfile}
        />
        </div>
        
        
        <div className="col col-12 col-md-6 col-lg-5 col-xl-4 bg-dark opacity-75 p-0 align-self-stretch" style={{ minHeight: '100vh' }} >
          <CreateProgram />
        </div>
        
      </div>
      : 
      <CardList
        cardData={allPrograms}
        title="Programs"
        path={`/programs/`}
        editable={false}
        userView={props.userView}
      />
      }
      

    </div>
  );
}

export default ProgramsPage;
