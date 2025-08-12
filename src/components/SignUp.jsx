import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [signupError, setSignupError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setSignupError("");
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          emailId: emailId,
          password: password,
        },
        // will allow the browser to send the cookies along with subsequent requests to the same domain or across domains
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setSignupError(err.response.data);
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup Page</h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">First Name:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Last Name:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Gender:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </label>

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
          {signupError && <p className="text-red-500">{signupError}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
        <p
          className="mx-auto m-2 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Signup;
