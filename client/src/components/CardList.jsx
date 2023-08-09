import React from 'react';
import CardListItem from './CardListItem';

function CardList(props) {
  const cards = props.cardData.map((card) => (
    <CardListItem
      key={card.id}
      programId={card.id}
      name={card.name}
      description={card.description}
      path={props.path}
      path_id={card.id}
      editable={props.editable}
      userView={props.userView}
      currentProfile={props.currentProfile}
      setCurrentProfile={props.setCurrentProfile}
    />
  ));

  return (
    <div>
      <h1 className="display-5 pt-3 fw-bold text-white">{props.title}</h1>
      <div className="px-4 row row-cols-1 row-cols-lg-2 row-cols-xl-3">
        {cards}
      </div>
    </div>
  );
}

export default CardList;
