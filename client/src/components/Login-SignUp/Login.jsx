const Login = () => {
  return (
    <div className="p-5 d-flex justify-content-center" style={{height: '100vh'}}>
      <form id="login_form" className="col col-12 col-md-7 col-lg-5 col-xl-4">
        <div className="container bg-dark text-white rounded py-5 px-3">
          <h3 className="text-warning fw-bold">Log in</h3>
          <p className="text-secondary">You guys can put some messages here if you want</p>
          <div className="text-start">
            <label for="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="username@gmail.com" required />
          </div>

          <div className="text-start py-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password" required />
          </div>

          <div>
            <a href="/signup" className="btn btn-link text-secondary">Create an account</a>
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
