import { useEffect } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";

const FeedPage = () => {
  const dispatch = useDispatch();
  const feedState = useSelector((store) => store.feed);
  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    if (feedState) return;
    try {
      const feeds = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feeds.data));
      console.log(feeds.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    feedState && (
      <div className="flex gap-20">
        {feedState.value.map((user) => {
          return <UserCard user={user} key={user._id} />;
        })}
      </div>
    )
  );
};

export default FeedPage;
