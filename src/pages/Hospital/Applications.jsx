import  { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios';
import ApplicationCard from '../../components/HospitalComponents/ApplicationCard';

export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState('pending');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axiosInstance.get(`/hospitals/1/applications`); // Replace 1 with the actual hospital ID
            setApplications(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch applications:", error);
            setIsLoading(false);
        }
    };

    const updateApplicationStatus = async (applicationId, status) => {
        try {
            await axiosInstance.put(`/applications/${applicationId}`, { status });
            fetchApplications(); // Re-fetch applications to get the updated list
        } catch (error) {
            console.error("Failed to update application status:", error);
        }
    };

    const filteredApplications = applications.filter(
        (application) => application.status === currentTab
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Hospital Applications</h1>
            <div className="tabs mb-4">
                <a 
                    className={`tab tab-bordered ${currentTab === 'pending' ? 'tab-active' : ''}`} 
                    onClick={() => setCurrentTab('pending')}
                >
                    Pending
                </a>
                <a 
                    className={`tab tab-bordered ${currentTab === 'accepted' ? 'tab-active' : ''}`} 
                    onClick={() => setCurrentTab('accepted')}
                >
                    Accepted
                </a>
                <a 
                    className={`tab tab-bordered ${currentTab === 'rejected' ? 'tab-active' : ''}`} 
                    onClick={() => setCurrentTab('rejected')}
                >
                    Rejected
                </a>
            </div>
            {filteredApplications.map((application) => (
                <ApplicationCard 
                    key={application.id} 
                    application={application} 
                    updateApplicationStatus={updateApplicationStatus} 
                />
            ))}
        </div>
    );
}
