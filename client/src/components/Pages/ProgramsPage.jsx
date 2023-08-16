/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useContext, useState, useEffect } from 'react';

import CardList from '../Programs/CardList';
import CreateProgram from '../Programs/CreateProgram';
import axios from 'axios';
import { programContext } from '../../contexts/ProgramProvider';
import { userContext } from '../../contexts/UserContext';

function ProgramsPage(props) {
  const [currentProfile, setCurrentProfile] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 

  const {
    allSearchablePrograms,
    userPrograms,
    nonUserPrograms,
  } = useContext(programContext);

  const {
    authenticated,
    userId
  } = useContext(userContext);

  useEffect(() => {
    if (authenticated) {
      axios
        .get(
          `http://localhost:8080/api/profile/${userId}`
        )
        .then((res) => {
          setCurrentProfile(res.data);
        });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const shouldShowLink = windowWidth <= 720;

  return (
    <div className="container-fluid m-0">
      {shouldShowLink && (
        <a
          href="#addProgram"
          className="btn bg-dark w-100 mt-0 ms-0  me-0 opacity-75  p-3 text-info m-3 fw-bold"
        >
          {' '}
          Add Program
        </a>
      )}
      {authenticated ? (
        <div className="row">
          <div className="col col-12 col-md-6 col-lg-9 pe-0">
            {userPrograms.length > 0 && (
              <CardList
                cardData={userPrograms}
                title="My Programs"
                editable={true}
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
                bg="bg-dark-75 pb-3"
              />
            )}
            <CardList
              cardData={nonUserPrograms}
              title="Public Programs"
              editable={false}
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
              bg="bg-dark-75 border-top border-secondary"
            />
          </div>
          <div
            className="col col-12 col-md-6 col-lg-3 bg-dark opacity-75 p-0"
            id="addProgram"
          >
            <CreateProgram />
          </div>
        </div>
      ) : (
        <CardList
          cardData={allSearchablePrograms}
          title="Programs"
          editable={false}
          userView={props.userView}
          bg="bg-dark-75" 
        />
      )}
    </div>
  );
}

export default ProgramsPage;
