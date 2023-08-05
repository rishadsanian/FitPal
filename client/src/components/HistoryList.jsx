import React from "react";
import HistoryListItem from "./HistoryListItem";
import "../styles/HistoryList.css";

 function HistoryList(){
  return (
    <div>
      <ul className="history-list list-group mx-auto mt-4 mb-4">
        <li className="list-group-item bg-dark text-warning"><h2>History</h2></li>
        <HistoryListItem />
        <HistoryListItem />
        <HistoryListItem />
      </ul>
        
    </div>
  )
}

export default HistoryList;