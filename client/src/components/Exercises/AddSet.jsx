/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const MUSCLE = {
  abdominals: "Abdominals",
  abductors: "Abductors",
  adductors: "Adductors",
  biceps: "Biceps",
  calves: "Calves",
  chest: "Chest",
  forearms: "Forearms",
  glutes: "Glutes",
  hamstrings: "Hamstrings",
  lats: "Lats",
  lower_back: "Lower Back",
  middle_back: "Middle Back",
  neck: "Neck",
  quadriceps: "Quadriceps",
  traps: "Traps",
  triceps: "Triceps",
};

const API_KEY = "66MiBm26oAuvQnk8ovq1gQ==iBf7uenDV84EMsti";
const API_URL = "https://api.api-ninjas.com/v1/exercises";

const AddExerciseModal = (props) => {
  const [reps, setReps] = useState("");
  const [weightLoad, setWeightLoad] = useState("");

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