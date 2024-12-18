import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/JoblyApi";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const jobData = await JoblyApi.getJob(id);

        setJob(jobData);
      } catch (err) {
        console.error("Error fetching job details:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!job) return <p>Error: Could not load job details.</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>
        <b>Company:</b> {job.companyName}
      </p>
      <p>
        <b>Salary:</b> {job.salary ? `$${job.salary}` : "N/A"}
      </p>
      <p>
        <b>Equity:</b> {job.equity || "N/A"}
      </p>
    </div>
  );
}

export default JobDetail;
