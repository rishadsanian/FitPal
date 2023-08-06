import React from "react"
import axios from "axios";
import { useState }  from "react"
import {useParams} from "react-router-dom";

const CreateSession = () => {

  const {program_id} = useParams();

  const [newSession, setNewSession] = useState({
    name: "",
    description: "",
  }); 
  
  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewSession((prevSession) => ({
      ...prevSession,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {

    try {
      // Submit form data to the server
      const response = await axios.post(`/sessions/program/${program_id}`, {
        name: newSession.name,
        description: newSession.description,
        program_id 
      });

      // Update the profile state with the newly created/updated profile data
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center">
      <form id="create_program_form" className="w-100">
        <div className="container bg-dark text-white rounded py-5 px-3">
          <h3 className="text-warning fw-bold">Create Session</h3>
          <div className="text-start">
            <label for="desciption" className="form-label">Name</label>
            <input onChange={handleChange} className="form-control" id="name" name="name" placeholder="name" required />
          </div>

          <div className="text-start py-3">
            <label for="description" class="form-label">Description</label>
            <textarea onChange={handleChange} class="form-control" id="description" name="description" placeholder="description"required />
          </div>

          <div className="d-grid pt-3">
            <button onClick={handleSubmit} className="btn btn-warning">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSession;