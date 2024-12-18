import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../api/JoblyApi";
import JobCard from "./JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await JoblyApi.getJobs();

        setJobs(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    setIsLoading(true);
    try {
      const jobs = await JoblyApi.getJobs({ title: searchTerm });
      setJobs(jobs);
      setSearchTerm("");
    } catch (error) {
      console.error("Error searching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Jobs</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search jobs..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {jobs.length ? (
          jobs.map((job) => (
            <Link to={`/jobs/${job.id}`} key={job.id}>
              <JobCard key={job.id} id={job.id} title={job.title} />
            </Link>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default Jobs;
