import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../store/requestsSlice";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

const RequestsPage = () => {
  const requests = useSelector((store) => store.requests);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const requests = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(requests.data.value));
    } catch (error) {
      console.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      setIsLoading(true);
      const acceptRequest = await axios.post(
        BASE_URL + "/request/review/" + action + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      fetchRequests();
    } catch (error) {
      console.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = (id) => {};

  if (!requests || !requests.length) return <div>No Requests Found</div>;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 className="font-bold">Connections</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center gap-20 my-5">
          {requests.map((user) => {
            return (
              <UserCard
                user={user.fromUserId}
                _id={user._id}
                key={user._id}
                requestPage={true}
                handleAction={handleAction}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
