import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  const { username, imageUrl } = user;

  return (
    <Link to={`/user/${username}`} className="user-card-link">
      <div className="user-card">
        <img src={imageUrl} alt={`${username}'s profile`} className="user-card-image" />
        <h3 className="user-card-username">{username}</h3>
      </div>
    </Link>
  );
};

export default UserCard;