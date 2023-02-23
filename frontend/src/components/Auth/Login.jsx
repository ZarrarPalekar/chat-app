import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>
        <div className="card-body">
          <form action="">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name=""
                id="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name=""
                id="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <input type="submit" value="Login" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to={"/messenger/register"}>Don't have an Account?</Link>{" "}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
