import { Link } from "react-router-dom";

const ICUCard = ({ icu, getDetails }) => (
    <div className="card bg-base-100 shadow-md mb-4">
        <div className="card-body">
            <h2 className="card-title">ICU Capacity: {icu.capacity}</h2>
            <h3 className="text-lg font-semibold mt-2">Equipments:</h3>
            <ul className="list-disc list-inside">
                {icu.equipments.map((equipment) => (
                    <li key={equipment.id}>{equipment.name}</li>
                ))}
            </ul>
            <Link to={`/icu/${icu.id}`} className="btn btn-primary mt-4">
            Details
            </Link>
        </div>
    </div>
);

export default ICUCard;
