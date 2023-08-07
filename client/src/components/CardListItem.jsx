import React from 'react';

function ProgramListItem(props) {
  return (
    <div className="col my-3">
      <div className="p-3 text-bg-dark rounded-3 text-start">
        <div className="h-100 p-3">
          <h3 className="text-warning">{props.name}</h3>
          <p>{props.description}</p>
          <a
            href={props.path + props.path_id}
            class="btn btn-outline-light"
            type="button"
          >
            See it
          </a>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-dark">
              <i class="fa-regular fa-pen-to-square fa-xl text-info"></i>
            </button>
            <button className="btn btn-dark">
              <i class="fa-regular fa-trash-can fa-xl text-danger"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramListItem;
