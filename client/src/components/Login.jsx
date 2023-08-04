const Login = () => {
  return (
    <div>
      <form id="login_form" class="position-absolute top-50 start-50 translate-middle">
        <div class="container bg-dark text-white rounded py-5 px-3">
          <h3 className="text-warning fw-bold">Log in</h3>
          <p class="text-secondary">You guys can put some messages here if you want</p>
          <div class="text-start">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="username@gmail.com" required />
          </div>

          <div class="text-start py-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password" required />
          </div>

          <div>
            <a href="/" className="btn btn-link text-secondary">Create an account</a>
          </div>

          <div class="d-grid pt-3">
            <button class="btn btn-warning">Log-in</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
