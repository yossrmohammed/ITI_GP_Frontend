import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const ApplicationCard = ({ application, updateApplicationStatus }) => (
    <div className="card bg-base-100 shadow-lg mb-4 p-4">
        <div className="card-body">
            <h2 className="card-title text-xl font-bold">Patient Name: {application.patient_name}</h2>
            <p className="text-gray-700">Patient Phone: {application.patient_phone}</p>
            <p className={`status-label ${application.status}`}>Status: {application.status}</p>
            <p className="text-gray-700">Description: {application.description}</p>
            <p className="text-gray-700">Created At: {new Date(application.created_at).toLocaleString()}</p>
            <h3 className="text-lg font-semibold mt-4">ICU Equipments:</h3>
            <ul className="list-disc list-inside ml-4">
                {application.intensive_care_unit.equipments.map((equipment) => (
                    <li key={equipment.id}>{equipment.name}</li>
                ))}
            </ul>
            {application.status === 'pending' && (
                <div className="mt-4 flex">
                    <button 
                        onClick={() => updateApplicationStatus(application.id, 'accepted')} 
                        className="btn btn-success mr-2 flex items-center"
                    >
                        <FontAwesomeIcon icon={faCheck} className="mr-1" /> Accept
                    </button>
                    <button 
                        onClick={() => updateApplicationStatus(application.id, 'rejected')} 
                        className="btn btn-danger flex items-center"
                    >
                        <FontAwesomeIcon icon={faTimes} className="mr-1" /> Reject
                    </button>
                </div>
            )}
        </div>
    </div>
);

export default ApplicationCard;
