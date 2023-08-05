import React from "react";

import TitleImage from "./TitleImage";
import HistoryList from "./HistoryList";
import CardList from "./CardList";
import CreateProgram from "./CreateProgram";

import programs from "../mocks/programData";

 function DevTest(){
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