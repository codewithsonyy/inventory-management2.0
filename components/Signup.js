import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      setCredentials({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      })
      navigate("/");
      props.showAlert("Account Created Successful", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-2">
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control mt-2 mb-3"
            id="name"
            name="name"
            value={credentials?.name || ""}
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter name "
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control mt-2"
            id="email"
            name="email"
            value={credentials?.email || ""}
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="email" className="form-text text-muted ">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control mt-2 mb-3"
            id="password"
            name="password"
            value={credentials?.password || ""}
            onChange={onChange}
            minLength={5}
            required
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Password</label>
          <input
            type="password"
            className="form-control mt-2 mb-3"
            id="cpassword"
            name="cpassword"
            value={credentials?.cpassword || ""}
            onChange={onChange}
            minLength={5}
            required
            placeholder=" Confirm Password"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;