import { useState } from 'react';

const SetRecord = (props) => {
  const [rep, setRep] = useState(null);
  const [resistant, setResistant] = useState(null);
  const set = props.set;

  const onChangeRep = (e) => {
    setRep(e.target.value);
  };

  const onChangeResistant = (e) => {
    setResistant(e.target.value);
  };

  return (
    <div className="px-3 text-white my-2">
      <div className="text-start">
        <form>
          <div className="row row-cols-sm-2">
            <div className="col">
              <div className="input-group flex-nowrap">
                <span className="input-group-text fw-bold text-secondary" id="addon-wrapping" style={{minWidth:'5em'}}>
                  {set.resistant ? set.resistant + 'lbs' : <i class="fa-solid fa-dumbbell"></i>}
                </span>
                <input
                  type="number"
                  className="form-control form-control-lg text-dark"
                  min="0"
                  onChange={onChangeResistant}
                  value={resistant || ''}
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group flex-nowrap">
              <span className="input-group-text fw-bold text-secondary" id="addon-wrapping" style={{minWidth:'4em'}}>
                  {set.reps ? 'x ' + set.reps : 'reps' }
                </span>
                <input
                  type="number"
                  className="form-control form-control-lg text-dark"
                  onChange={onChangeRep}
                  value={rep || ''}
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
