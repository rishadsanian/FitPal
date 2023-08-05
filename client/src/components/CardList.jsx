import React from "react";
import CardListItem from "./CardListItem";

 function CardList(props){
  const cards = props.cardData.map(card => 
    <CardListItem 
      key={card.id}
      name={card.name}
      description={card.description}
    />
  )

  return (
    <div> 
      <div>
        <h1 className="display-5 pt-3 fw-bold text-white">Programs</h1>
        <div className="px-4 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
          {cards}
        </div>
        
      </div>    
    </div>
  )
}

export default CardList;