import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import Loader from "../components/Loader";

const FeedPage = () => {
  const dispatch = useDispatch();
  const feedState = useSelector((store) => store.feed);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    try {
      setIsLoading(true);
      const feeds = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feeds.data));
      console.log(feeds.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      setIsLoading(true);
      const sendRequest = await axios.post(
        BASE_URL + "/request/send/" + action + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Something went wrong");
    } finally {
      fetchFeeds();
      setIsLoading(false);
    }
  };
  const user = feedState?.value.length ? feedState.value[0] : {};
  if (loading) return <Loader />;
  return (
    <>
      {feedState && feedState.value.length ? (
        <div className="flex justify-center ">
          <UserCard
            user={user}
            key={user._id}
            feedPage={true}
            handleAction={handleAction}
          />
        </div>
      ) : (
        <p>No New User in your area</p>
      )}
    </>
  );
};

export default FeedPage;
