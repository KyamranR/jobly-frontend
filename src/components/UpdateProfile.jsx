import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import JoblyApi from "../api/JoblyApi";

function UpdateProfile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const INITIAL_STATE = {
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
    setSaveSuccess(false);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!formData.password || formData.password.length < 5) {
      setFormErrors([
        "Password is required and must be at least 5 characters to make a change",
      ]);
      setSaveSuccess(false);
      return;
    }

    try {
      const updatedUser = await JoblyApi.updatedUser(
        currentUser.username,
        formData
      );
      setCurrentUser(updatedUser);
      setFormErrors([]);
      setSaveSuccess(true);

      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      console.error("Error updating the user info:", error);
      setFormErrors(error);
      setSaveSuccess(false);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>

      <form onSubmit={handleSubmit} className="profile-form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={currentUser.username}
            disabled
          />
        </div>

        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password to confirm changes"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {formErrors.length > 0 && (
          <div className="errors">
            {formErrors.map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </div>
        )}

        {saveSuccess && (
          <div className="success">Profile updated successfully!</div>
        )}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
