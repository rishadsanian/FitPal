const SessionItem = (props) => {
  const session = props.session;
  const url = `/programs/${session.program_id}/sessions/${session.id}`;
  return (
    <div className="col my-3">
      <div className="h-100 p-3 text-bg-dark rounded-3 text-start">
        <h2 className="text-warning">{session.name}</h2>
        <p className="card-text text-start"></p>
        <p className="text-light">{session.description}</p>
        <a href={url} className="btn btn-outline-light" type="button">
          See it
        </a>
      </div>
    </div>
  );
};

export default SessionItem;
