import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeRePassword = (e) => {
    setRePassword(e.target.value);
  };

  const handleNewUserProfile = async (userId) => {
    try {
      // Submit form data to the server and db
      await axios.post("/profile", {
        user_id: userId,
        date_of_birth: null,
        height: 0,
        weight: 0,
        gender: "Not Selected",
        fitness_level: "Not Selected",
        goal: "Not Set",
        program_id: null,
        name: null,
      });
    } catch (error) {
      console.error("Error creating/updating profile:", error);
    }
  };

  const onSignUp = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");

    const user = { email, password };

    axios
      .post("http://localhost:8080/users/", user)
      .then((res) => {
        if (res.status === 200) {
          window.sessionStorage.setItem("isAuthenticated", true);
          window.sessionStorage.setItem("userId", res.data.result.id);
          window.sessionStorage.setItem("email", res.data.result.email);
          handleNewUserProfile(res.data.result.id);
          window.location = "/dashboard";
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <div
      className="p-5 d-flex justify-content-center"
      style={{ height: "100vh" }}
    >
      <form
        className="col col-12 col-md-7 col-lg-5 col-xl-4"
        onSubmit={onSignUp}
      >
        <div className="container bg-dark text-white rounded py-5 px-3">
          <h3 className="text-warning fw-bold">Create an account</h3>
          <p className="text-secondary">
            Please fill out the information below to create an account. 
          </p>
          <div className="text-start">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="username@gmail.com"
              required
            />
          </div>

          <div className="text-start py-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </div>

          <div className="text-start pb-3">
            <label htmlFor="re" className="form-label">
              Confirm-password
            </label>
            <input
              type="password"
              className="form-control"
              id="re"
              name="password"
              value={rePassword}
              onChange={onChangeRePassword}
              required
            />
          </div>

          {errorMessage && <div className="text-danger">{errorMessage}</div>}

          <div className="d-grid pt-3">
            <button className="btn btn-warning">Sign-up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
