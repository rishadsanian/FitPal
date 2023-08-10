import React, { useState } from 'react';

const AddSet = (props) => {
  const [set, setSet] = useState(props.set);

  const handleWeightChange = (e) => {
    const newSet = { ...set, resistant: e.target.value };
    setSet(newSet);
    props.updateSetInSets(newSet);
  };

  const handleRepsChange = (e) => {
    const newSet = { ...set, reps: e.target.value };
    setSet(newSet);
    props.updateSetInSets(newSet);
  };

  return (
    <div className="row row-cols-sm-2 my-2">
      <div className="col">
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Weight
          </span>
          <input
            type="number"
            value={set.resistant}
            onChange={handleWeightChange}
            required
            min="0"
            className="form-control form-control-lg bg-dark text-white"
          />
        </div>
      </div>
      <div className="col">
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Reps
          </span>
          <input
            type="number"
            value={set.reps}
            onChange={handleRepsChange}
            required
            min="1"
            className="form-control form-control-lg bg-dark text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default AddSet;
