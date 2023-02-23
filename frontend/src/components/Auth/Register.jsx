import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../../store/actions/authAction";
import { toast } from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [loadImage, setLoadImage] = useState(null);

  const inputHandler = (e) => {
    if (!e.target.files) {
      setState({ ...state, [e.target.name]: e.target.value });
    } else if (e.target.files.length > 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      const reader = new FileReader();
      reader.onload = () => {
        setLoadImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const registerAction = (e) => {
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    e.preventDefault();
    const { userName, email, password, confirmPassword, image } = state;
    console.log("image: ", image);

    if (!image) {
      return toast.error("Image is required!");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords didn't match!");
    }
    console.log("state PZJ: ", state);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
    dispatch(userRegister(formData));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={registerAction}>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="form-control"
                placeholder="Enter user name"
                value={state.userName}
                onChange={inputHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={state.email}
                onChange={inputHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                value={state.password}
                onChange={inputHandler}
                required
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
                value={state.confirmPassword}
                onChange={inputHandler}
                required
                minLength={6}
              />
            </div>
            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} alt="img" /> : null}
                </div>
                <div className="file">
                  <label htmlFor="image">Select image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input type="submit" value="Register" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to={"/"}>Login to Your Account</Link>{" "}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
