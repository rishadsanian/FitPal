import React from "react"
import axios from "axios";
import { useState }  from "react"

const CreateProgram = () => {
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
  }); 
  
  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    if(newProgram.name && newProgram.description){
      try {
        // Submit form data to the server
        const response = await axios.post("/programs", {
          userId: window.sessionStorage.getItem('userId'),
          name: newProgram.name,
          description: newProgram.description
        });

        // Update the profile state with the newly created/updated profile data
      } catch (error) {
        console.error("Error creating/updating profile:", error);
      }
    }
  };

  return (
    <div className="p-5">
      <form id="create_program_form" className="">
        <div className="container bg-dark text-white rounded">
          <h3 className="text-warning fw-bold">Create Program</h3>
          <div className="text-start">
            <label htmlFor="desciption" className="form-label">Name</label>
            <input onChange={handleChange} className="form-control" id="name" name="name" placeholder="name" required />
          </div>

          <div className="text-start py-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea onChange={handleChange} className="form-control" id="description" name="description" placeholder="description"required />
          </div>

          <div className="d-grid pt-3">
            <button onClick={handleSubmit} className="btn btn-warning">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProgram;