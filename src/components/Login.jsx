import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    try {
      const res = axios.post(
        "http://localhost:3000/login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login Page</h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email Id:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password:</span>
            </div>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
