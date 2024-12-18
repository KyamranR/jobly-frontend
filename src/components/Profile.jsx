import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

function Profile() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {currentUser.username}</p>
      <p>Username: {currentUser.firstName}</p>
      <p>Username: {currentUser.lastName}</p>
      <p>Username: {currentUser.email}</p>

      <Link to="/profile/edit">
        <button>Edit User Info</button>
      </Link>
    </div>
  );
}

export default Profile;
