import React from "react";


 function ProgramListItem(props){
  return (
    
      <div className="col my-3">
        
          <div className="h-100 p-3 text-bg-dark rounded-3 text-start"> 
            <div className="h-100 p-3">
              <h3 className="text-warning">{props.name}</h3>
                <p>
                  {props.description}
                </p>
                <a href={props.path + props.path_id} class="btn btn-outline-light" type="button">
                  See it
                </a>
            </div>
            
          </div>
       
      </div>    
  )
}

export default ProgramListItem;