const SetRecord = (props) => {
  const set = props.set;
  return (
    <div className="p-1 text-white m-3 rounded-3">
      <div className="text-start">
        <form>
          <div className="row row-cols-sm-2">
            <div className="col">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  {set.resistant ? set.resistant + 'lbs' : 'weight'}
                </span>
                <input
                  type="number"
                  className="form-control form-control-lg text-white"
                  min="0"
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  {set.reps} reps
                </span>
                <input
                  type="number"
                  className="form-control form-control-lg text-white"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SetRecord;
