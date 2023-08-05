const SetRecord = () => {
  return (
    <div className="p-3 text-white bg-dark m-3 rounded-3">
      <h4 className="text-start fw-bold"> Set 1: {' '}
        <span className="badge text-bg-warning">45lbs</span> |{' '}
        <span className="badge text-bg-light"> 8 reps</span>
      </h4>
      <div className="text-start">
        <form>
          <div className="row row-cols-sm-2">
            
            <div className="col">
              <div class="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">Weight</span>
                <input type="text" className="form-control form-control-lg"/>
              </div>
            </div>
            <div className="col">
              <div class="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">Reps</span>
                <input type="text" className="form-control form-control-lg"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SetRecord;
