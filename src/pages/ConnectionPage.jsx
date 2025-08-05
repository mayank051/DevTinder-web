import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";
import UserCard from "../components/UserCard";

const ConnectionPage = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(connections.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || !connections.length)
    return <div>No Connections Found!!</div>;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 className="font-bold">Connections</h1>
      <div className="flex justify-center gap-20 my-5">
        {connections.map((user) => {
          return <UserCard user={user} key={user._id} connectionPage={true} />;
        })}
      </div>
    </div>
  );
};

export default ConnectionPage;
