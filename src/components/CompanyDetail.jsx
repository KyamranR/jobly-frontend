import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/JoblyApi";
import UserContext from "./UserContext";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (err) {
        console.error("Error fetching company details:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompany();
  }, [handle]);

  function hasApplied(jobId) {
    return currentUser.applications.includes(jobId);
  }

  async function handleApply(jobId) {
    if (hasApplied(jobId)) return;

    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);

      setCurrentUser((user) => ({
        ...user,
        applications: [...user.applications, jobId],
      }));
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (!company) return <p>Error: Could not load company details.</p>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <h2>Jobs</h2>
      <ul>
        {company.jobs.map((job) => (
          <li key={job.id}>
            <b>{job.title}</b> — {job.salary ? `$${job.salary}` : "N/A"}
            {job.equity && ` (Equity: ${job.equity})`}
            <button
              onClick={() => handleApply(job.id)}
              disabled={hasApplied(job.id)}
            >
              {hasApplied(job.id) ? "Applied" : "Apply"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetail;
