import React from 'react';

const ICUBookCard = ({ icu, onBookICU }) => {
    const { capacity, equipments, hospital } = icu;

    return (
        <div className="card bg-base-100 shadow-md mb-4">
            <div className="card-body">
                <h2 className="card-title">ICU Capacity: {capacity}</h2>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Equipments:</h3>
                    <ul className="list-disc list-inside">
                        {equipments.map((equipment) => (
                            <li key={equipment.id}>{equipment.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Hospital Information:</h3>
                    <p><strong>Hospital Name:</strong> {hospital.user.name}</p>
                    <p><strong>Address:</strong> {hospital.address}</p>
                    <p><strong>Phone:</strong> {hospital.user.phone}</p>
                    <p><strong>Email:</strong> {hospital.user.email}</p>
                </div>

                <div className="mt-4">
                    <button onClick={() => onBookICU(icu)} className="btn btn-info">
                        Book ICU
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ICUBookCard;
