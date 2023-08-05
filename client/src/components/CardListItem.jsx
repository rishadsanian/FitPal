import React from "react";


 function CardListItem(props){
  return (
    
      <div className="col my-3">
        <a href="/programs/1/" className="text-decoration-none">
          <div className="h-100 p-3 text-bg-dark rounded-3 text-start"> 
            <div className="h-100 p-3">
              <h3 className="text-warning">{props.name}</h3>
                <p>
                  {props.description}
                </p>
            </div>
          </div>
        </a>
      </div>    
  )
}

export default CardListItem;