const ACCEPTED = "accepted";
const REJECTED = "rejected";
const INTERESTED = "interested";
const IGNORED = "ignored";
const UserCard = ({
  user,
  connectionPage = false,
  requestPage = false,
  feedPage = false,
  handleAction = () => {},
  _id = "",
}) => {
  const { firstName, lastName, photoUrl, about, skills } = user;
  return (
    <div className=" card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="Profile Photo"
          className="h-[250px] w-full object-cover rounded-full mx-auto"
          style={{ maxWidth: "250px" }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about}</p>
        <div>
          {connectionPage && (
            <button className="btn btn-secondary">{"Message"}</button>
          )}
          {requestPage && (
            <div className="flex card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleAction(_id, REJECTED)}
              >
                {"Reject"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleAction(_id, ACCEPTED)}
              >
                {"Accept"}
              </button>
            </div>
          )}
          {feedPage && (
            <div className="flex card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleAction(user._id, IGNORED)}
              >
                {"Ignore"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleAction(user._id, INTERESTED)}
              >
                {"Interested"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
