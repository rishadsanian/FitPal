import React from "react";
import { useState, useEffect} from "react";

import TitleImage from "../TitleCards/TitleImage";
import HistoryList from "../Dashboard/HistoryList";
import CardList from "../CardList";
import CreateProgram from "../Programs/CreateProgram";
import CreateSession from "../Sessions/CreateSession";
import axios from "axios";

 function DevTest(){
  const [programs, setPrograms] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:8080/programs`).then((res) => {
      setPrograms(res.data.program);
    });
 }, []);

  return (
    <div>
      <TitleImage />
      <HistoryList />
      <CardList cardData={programs} title="Programs" path={`/programs/`}/>
      <CreateProgram />
      <CreateSession />
    </div>
  )
}

export default DevTest;