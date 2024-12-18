import { Link } from "react-router-dom";

function CompanyCard({ handle, name, logoUrl }) {
  return (
    <div className="CompanyCard">
      {<img src={logoUrl} />}
      <h3>
        <Link to={`/companies/${handle}`}>{name}</Link>
      </h3>
    </div>
  );
}

export default CompanyCard;
