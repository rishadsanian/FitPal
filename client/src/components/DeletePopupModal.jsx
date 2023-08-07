import React from "react";
import "../styles/Modals.css"

const DeletePopupModal = (props) => {
  return (
    <div>
      <div className="modal-background"></div>
      <div>
      <div className="modal-foreground position-fixed top-50 start-50 translate-middle col-10 col-sm-8 col-md-8 col-lg-6">
        <div className="container bg-dark text-white rounded py-3 px-3">
            <h3 className="text-warning">Are you sure?</h3>
            <h5 className="text-light">{props.message}</h5>
            <button className="btn btn-light btn-lg btn-block mx-2 my-4" onClick={() => {props.modalAction(props.modalParams); window.location.reload()}}>
              Yes
            </button>
            
            <button className="btn btn-light btn-lg btn-block mx-2 my-4" onClick={() => props.modalToggle(false)}>
              No
            </button>
          </div>
      </div>
    </div>
    </div>
  );
}

export default DeletePopupModal;