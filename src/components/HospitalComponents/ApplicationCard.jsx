
const ApplicationCard = ({ application, updateApplicationStatus }) => (
    <div className="card bg-base-100 shadow-md mb-4">
        <div className="card-body">
            <h2 className="card-title">Patient Name: {application.patient_name}</h2>
            <p>Patient Phone: {application.patient_phone}</p>
            <p>Status: {application.status}</p>
            <p>Description: {application.description}</p>
            <p>Created At: {new Date(application.created_at).toLocaleString()}</p>
            <h3 className="text-lg font-semibold mt-2">ICU Equipments:</h3>
            <ul className="list-disc list-inside">
                {application.intensive_care_unit.equipments.map((equipment) => (
                    <li key={equipment.id}>{equipment.name}</li>
                ))}
            </ul>
            {application.status === 'pending' && (
                <div className="mt-4">
                    <button 
                        onClick={() => updateApplicationStatus(application.id, 'accepted')} 
                        className="btn btn-success mr-2"
                    >
                        Accept
                    </button>
                    <button 
                        onClick={() => updateApplicationStatus(application.id, 'rejected')} 
                        className="btn btn-danger"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    </div>
);

export default ApplicationCard;
