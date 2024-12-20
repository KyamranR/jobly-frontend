import { Link } from "react-router-dom";

function CompanyCard({ handle, name, logoUrl }) {
  const fallbackUrl = logoUrl || "/vite.svg";

  return (
    <div className="CompanyCard">
      <img
        src={fallbackUrl}
        alt="Company logo"
        onError={(e) => (e.target.src = "/vite.svg")}
      />
      <h3>
        <Link to={`/companies/${handle}`}>{name}</Link>
      </h3>
    </div>
  );
}

export default CompanyCard;
