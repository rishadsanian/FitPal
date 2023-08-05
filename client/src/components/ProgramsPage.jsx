import React from "react";
import { useState, useEffect} from "react";

import CardList from "./CardList";
import CreateProgram from "./Programs/CreateProgram";
import axios from "axios";

 function ProgramsPage(){
  const [programs, setPrograms] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:8080/programs`).then((res) => {
      setPrograms(res.data.program);
    });
 }, []);

  return (
    <div>
      <CardList cardData={programs} title="Programs" path={`/programs/`}/>
      <CreateProgram />
    </div>
  )
}

export default ProgramsPage;