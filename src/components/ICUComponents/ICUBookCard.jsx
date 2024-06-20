
const ICUBookCard = ({ icu, onBookICU }) => (
    <div className="card bg-base-100 shadow-md mb-4">
        <div className="card-body">
            <h2 className="card-title">ICU Capacity: {icu.capacity}</h2>
            <h3 className="text-lg font-semibold mt-2">Equipments:</h3>
            <ul className="list-disc list-inside">
                {icu.equipments.map((equipment) => (
                    <li key={equipment.id}>{equipment.name}</li>
                ))}
            </ul>
            <h3 className="text-lg font-semibold mt-2">Hospital Information:</h3>
            <p><strong>Hospital Name:</strong> {icu.hospital.user.name}</p>
            <p><strong>Address:</strong> {icu.hospital.address}</p>
            <p><strong>Phone:</strong> {icu.hospital.user.phone}</p>
            <p><strong>Email:</strong> {icu.hospital.user.email}</p>
            <button onClick={() => onBookICU(icu)} className="btn btn-primary mt-4">
                Book ICU
            </button>
        </div>
    </div>
);

export default ICUBookCard;
