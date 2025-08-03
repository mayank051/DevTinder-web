import React from "react";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((store) => store.user);
  return user && <EditProfile user={user} />;
};

export default ProfilePage;
