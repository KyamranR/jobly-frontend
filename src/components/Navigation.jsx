import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./Navigation.css";

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {currentUser ? (
        <>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <span>Welcome, {currentUser.username}!</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navigation;
