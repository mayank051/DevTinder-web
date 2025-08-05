import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../store/requestsSlice";
import UserCard from "../components/UserCard";

const RequestsPage = () => {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(requests.data.value));
    } catch (error) {
      console.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || !requests.length) return <div>No Requests Found</div>;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 className="font-bold">Connections</h1>
      <div className="flex justify-center gap-20 my-5">
        {requests.map((user) => {
          return (
            <UserCard
              user={user.fromUserId}
              key={user._id}
              requestPage={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RequestsPage;
