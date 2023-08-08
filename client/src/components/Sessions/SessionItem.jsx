import React from "react";
import { useState } from "react";

const SessionItem = (props) => {
  const [deleteMode, setDeleteMode] = useState();

  const setList = props.sets
      .filter((set) => set.exercise_name === props.exercise.name)
      .map((set) => (
        <span className="badge text-bg-light" key={set.id}>
          {set.resistant}lbs/{set.reps}
        </span>
      ));
  return (
    <tr>
      {!deleteMode ? 
      <td role="button" className="p-3 d-flex justify-content-between">
        <div>
          <h6 className="">{props.exercise.name}</h6>
          <div className="d-flex gap-2 flex-wrap">{setList}</div>
        </div>
        {/* {add edit - delete button} */}
        <div className="align-self-center">
          <button className="btn">
            <i className="fa-regular fa-pen-to-square fa-xl text-light"></i>
          </button>
          <button className="btn">
            <i className="fa-regular fa-trash-can fa-xl text-danger"></i>
          </button>
        </div>
      </td> 
      :
      <td role="button" className="p-3 d-flex justify-content-between">
        <div>
          <h6 className="">Deleting</h6>
        </div>
        {/* {add edit - delete button} */}
        <div className="align-self-center">
          <button className="btn">
            <i className="fa-regular fa-pen-to-square fa-xl text-light"></i>
          </button>
          <button className="btn">
            <i className="fa-regular fa-trash-can fa-xl text-danger"></i>
          </button>
        </div>
      </td> 
      }
    </tr>
  );
};

export default SessionItem;
