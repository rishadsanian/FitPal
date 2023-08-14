import { useState, useContext } from 'react';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    axios
      .post('http://localhost:8080/users/login', user)
      .then((res) => {
        if (res.status === 200) {
          window.sessionStorage.setItem('isAuthenticated', true);
          window.sessionStorage.setItem('userId', res.data.user.id);
          window.sessionStorage.setItem('email', res.data.user.email);

          window.location = '/dashboard';
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div
      className="p-5 d-flex justify-content-center"
      style={{ height: '100vh' }}
    >
      <form
        id="login_form"
        className="col col-12 col-md-7 col-lg-5 col-xl-4"
        onSubmit={onSubmit}
      >
        <div className="container bg-dark text-white rounded py-5 px-3">
          <h3 className="text-warning fw-bold">Log in</h3>
          <p className="text-secondary">
            You guys can put some messages here if you want
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
              placeholder="username@gmail.com"
              value={email}
              onChange={onChangeEmail}
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

          <div>
            <a href="/signup" className="btn btn-link text-secondary">
              Create an account
            </a>
          </div>

          <div className="d-grid pt-3">
            <button className="btn btn-warning">Log-in</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
