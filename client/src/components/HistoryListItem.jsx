import React from "react";


 function HistoryListItem(props){
  return (
    <li className="list-group-item bg-dark">
      <div className="d-flex justify-content-between align-items-center">
        <span className="text-light">Yesterday</span>
        <button className="btn btn-dark">
          <i class="fa-solid fa-circle-info"></i>
        </button>
      </div>
    </li>
  )
}

export default HistoryListItem;