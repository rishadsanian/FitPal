import React from "react"

  // on submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Submit form data to the server
      const response = await axios.post("/profile", {
        user_id: 3, // Replace '1' with user-id from current_user prop
        age: profile.age,
        height: profile.height,
        weight: profile.weight,
        gender: profile.gender,
      });

      // Update the profile state with the newly created/updated profile data
      setProfile(response.data);
      setEditing(false); // Hide the form after submitting
    } catch (error) {
      console.error("Error creating/updating profile:", error);
    }
  };


const CreateProgram = () => {
  return (
    <div className="p-5 d-flex justify-content-center" style={{height: '100vh'}}>
      <form id="create_program_form" className="col col-12 col-md-7 col-lg-5 col-xl-4">
        <div className="container bg-dark text-white rounded py-5 px-3">
          <h3 className="text-warning fw-bold">Create Program</h3>
          <div className="text-start">
            <label for="desciption" className="form-label">Name</label>
            <input className="form-control" id="name" name="name" placeholder="name" required />
          </div>

          <div className="text-start py-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" name="description" placeholder="description"required />
          </div>

          <div className="d-grid pt-3">
            <button className="btn btn-warning">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProgram;