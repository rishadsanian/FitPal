import { useState } from 'react';

const SetRecord = (props) => {
  const [rep, setRep] = useState(null);
  const [resistance, setResistance] = useState(null);
  const set = props.set;
  const [record, setRecord] = useState({});

  const onChangeRep = (e) => {
    const newRep = e.target.value;
    setRep(newRep);
    const updatedRecord = { ...record, reps: newRep || 0, id: set.id };
    setRecord(updatedRecord);
    props.updateRecord(updatedRecord);
  };

  const onChangeResistant = (e) => {
    const newResistance = e.target.value;
    setResistance(newResistance);
    const updatedRecord = {
      ...record,
      resistance: newResistance || 0,
      id: set.id,
    };
    setRecord(updatedRecord);
    props.updateRecord(updatedRecord);
  };

  return (
    <div className="px-3 text-white my-2">
      <div className="text-start">
        <form>
          <div className="row row-cols-sm-2">
            <div className="col">
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text fw-bold text-secondary"
                  id="addon-wrapping"
                >
                  {set.resistant ? set.resistant + 'lbs' : 'weight'}
                </span>
                <input
                  type="number"
                  className="form-control form-control-lg text-dark"
                  min="0"
                  onChange={onChangeResistant}
                  value={resistance || ''}
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text fw-bold text-secondary"
                  id="addon-wrapping"
                >
                  {set.reps ? 'x ' + set.reps : 'reps'}
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
