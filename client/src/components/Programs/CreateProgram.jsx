import React from "react"
import { useContext, useState }  from "react"
import { programContext } from '../../providers/ProgramProvider';

const CreateProgram = () => {
  const { createProgram, setNewProgram } = useContext(programContext);

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [name]: value,
    }));
  };
  
  

  return (
    <div className="p-5">
      <form id="create_program_form" className="">
        <div className="container bg-dark text-white rounded">
          <h3 className="text-warning fw-bold">Create Program</h3>
          <div className="text-start">
            <label for="desciption" className="form-label">Name</label>
            <input onChange={handleChange} className="form-control" id="name" name="name" placeholder="name" required />
          </div>

          <div className="text-start py-3">
            <label for="description" class="form-label">Description</label>
            <textarea onChange={handleChange} class="form-control" id="description" name="description" placeholder="description"required />
          </div>

          <div className="d-grid pt-3">
            <button onClick={() => createProgram()} className="btn btn-warning">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProgram;