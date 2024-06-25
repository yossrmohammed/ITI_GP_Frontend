import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const ApplicationCard = ({ application, updateApplicationStatus }) => (
    <div className="card  shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="card-body">
            <h2 className="card-title text-xl font-bold mb-2">Patient Name: {application.patient_name}</h2>
            <p className=" mb-1">Patient Phone: {application.patient_phone}</p>
            <p className={`status-label ${application.status} mb-1`}>Status: {application.status}</p>
            <p className="mb-1">Description: {application.description}</p>
            <p className=" mb-2">Created At: {new Date(application.created_at).toLocaleString()}</p>
            <h3 className="text-lg font-semibold mb-2">ICU Equipments:</h3>
            <ul className="list-disc list-inside ml-4 mb-4">
                {application.intensive_care_unit.equipments.map((equipment) => (
                    <li key={equipment.id}>{equipment.name}</li>
                ))}
            </ul>
            {application.status === 'pending' && (
                <div className="mt-4 flex justify-between">
                    <button 
                        onClick={() => updateApplicationStatus(application.id, 'accepted')} 
                        className="btn btn-success flex items-center px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" /> Accept
                    </button>
                    <button 
                        onClick={() => updateApplicationStatus(application.id, 'rejected')} 
                        className="btn btn-danger flex items-center px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" /> Reject
                    </button>
                </div>
            )}
        </div>
    </div>
);

export default ApplicationCard;
