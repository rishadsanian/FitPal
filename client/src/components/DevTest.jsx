import React from "react";
import { useState, useEffect} from "react";

import TitleImage from "./TitleImage";
import HistoryList from "./HistoryList";
import CardList from "./CardList";
import CreateProgram from "./Programs/CreateProgram";
import axios from "axios";

import programs from "../mocks/programData";




 function DevTest(){
  const [programs, setPrograms] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:8080/programs`).then((res) => {
      setPrograms(res.data.program);
    });
 })

  return (
    <div>
      <TitleImage />
      <HistoryList />
      <CardList cardData={programs} title="Programs" path={`/programs/`}/>
      <CreateProgram />
    </div>
  )
}

export default DevTest;