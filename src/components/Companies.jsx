import { useState, useEffect } from "react";
import JoblyApi from "../api/JoblyApi";
import CompanyCard from "./CompanyCard";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchCompanies(name) {
    try {
      const companies = await JoblyApi.getCompanies(name);
      setCompanies(companies);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError(err);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleInputChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    fetchCompanies(searchTerm);
  };

  return (
    <div>
      <h1>Companies</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search companies..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {companies.length ? (
          companies.map((c) => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))
        ) : (
          <p>No companies found.</p>
        )}
      </div>
    </div>
  );
}

export default Companies;
