const SessionItem = () => {
  return (
    <div className="col my-3">
      <div className="h-100 p-3 text-bg-dark rounded-3 text-start">
        <h2 className="text-warning">Chest day</h2>
        <p className="card-text text-start">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
        </p>
        <a href="/programs/1/sessions/1" class="btn btn-outline-light" type="button">
          See it
        </a>
      </div>
    </div>
  );
};

export default SessionItem;
