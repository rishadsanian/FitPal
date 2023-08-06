/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddExerciseModal = (props) => {
  const [reps, setReps] = useState(10);
  const [weightLoad, setWeightLoad] = useState(10);

  useEffect(() => {
    props.setSets((prev) => {
        prev[props.id].weight = weightLoad;
        return [...prev]
    })
  }, [weightLoad]);


  useEffect(() => {
    props.setSets((prev) => {
        prev[props.id].reps = reps;
        return [...prev]
    })
  }, [reps]);

  return (
    <div>
      <div className="row row-cols-sm-2">
        <div className="col">
          <div class="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Weight
            </span>
            <input
              type="number"
              id="weightLoad"
              value={weightLoad}
              onChange={(e) => setWeightLoad(e.target.value)}
              required
              min="1"
              className="form-control form-control-lg"
            />
          </div>
        </div>
        <div className="col">
          <div class="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Reps
            </span>
            <input
              type="number"
              id="reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
              min="1"
              className="form-control form-control-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExerciseModal;