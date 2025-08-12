import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import ToastComponent from "./Toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();

  const handleProfileUpdate = async () => {
    try {
      setError("");
      const updatedProfile = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          photoUrl: photoUrl,
          about: about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(updatedProfile.data.data));
      setSuccessMsg(updatedProfile.data.message);
      setTimeout(() => {
        setSuccessMsg("");
      }, 5000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      {successMsg && (
        <ToastComponent message={successMsg} type="alert-success" />
      )}
      <div className="flex gap-10 justify-center m-5">
        <div className="flex justify-center my-20 card">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile Page</h2>

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
                  <span className="label-text">Photo Url:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              {error && <p className="text-red-500">{error}</p>}
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  onClick={handleProfileUpdate}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, gender, photoUrl, about }} />
      </div>
    </>
  );
};

export default EditProfile;
