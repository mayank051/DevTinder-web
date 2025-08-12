import React, { useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./store/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const profileData = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(profileData.data));
    } catch (err) {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/signup"
    )
      return;
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
