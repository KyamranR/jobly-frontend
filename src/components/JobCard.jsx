import { useContext, useState } from "react";
import UserContext from "./UserContext";
import JoblyApi from "../api/JoblyApi";

function JobCard({ id, title }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [applied, setApplied] = useState(currentUser.applications.includes(id));

  async function handleApply() {
    if (applied) return;

    try {
      await JoblyApi.applyToJob(currentUser.username, id);
      setApplied(true);

      setCurrentUser((user) => ({
        ...user,
        applications: [...user.applications, id],
      }));
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  }

  return (
    <div className="job-card">
      <h2>{title}</h2>

      <button onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
