import React from "react";
import HistoryListItem from "./HistoryListItem";

 function HistoryList(){
  return (
    <div>
      <ul className="history-list list-group mx-auto mt-4 mb-4">
        <li className="list-group-item list-group-item-dark">History</li>
        <HistoryListItem />
        <HistoryListItem />
        <HistoryListItem />
      </ul>
        
    </div>
  )
}

export default HistoryList;