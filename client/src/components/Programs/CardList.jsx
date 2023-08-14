import React from 'react';
import CardListItem from './CardListItem';
import { useContext } from 'react';
import { programContext } from '../../contexts/ProgramProvider';
import SessionsProvider from '../../contexts/SessionsProvider';

function CardList(props) {

  const { searchProgramsByText } = useContext(programContext);

  const cards = props.cardData.map((card) => (
    <SessionsProvider
      key={card.id}
      name={card.name}
      programId={card.id}
      description={card.description}
      editable={props.editable}
      currentProfile={props.currentProfile}
      setCurrentProfile={props.setCurrentProfile}
    >
      <CardListItem/>
    </SessionsProvider>
  ));

  return (
      <div className={"min-vh-10 " + props.bg}>
        <h1 className="display-5 pt-3 fw-bold text-white">{props.title}</h1>
        {!props.editable && <div className='p-3'>
          <input
            className="form-control fs-5"
            type="search"
            placeholder="type a program name or description"
            onChange={(e) => searchProgramsByText(e.target.value, props.editable)}
          /> 
        </div>}
        <div className="px-3 row row-cols-1 row-cols-lg-2 row-cols-xl-3">
          {cards}
        </div>
      </div>
  );
}

export default CardList;
