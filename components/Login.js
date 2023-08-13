import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
   
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in Successful","success")
      setCredentials({ email: "", password: "" })
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h2 className="title">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4 ">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control mt-3"
            value={credentials?.email||""}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted ">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mt-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control mt-3 "
            onChange={onChange}
            value={credentials?.password||""}
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>

  
    </>
  );
};

export default Login;