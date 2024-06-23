import { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios';
import ApplicationCard from '../../components/HospitalComponents/ApplicationCard';

const Applications = () => {
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
            <div className="flex justify-center items-center h-48">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Hospital Applications</h1>
            <div className="tabs mb-4 flex justify-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredApplications.map((application) => (
                    <ApplicationCard 
                        key={application.id} 
                        application={application} 
                        updateApplicationStatus={updateApplicationStatus} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Applications;
