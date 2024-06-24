import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios';
import ApplicationCard from '../../components/HospitalComponents/ApplicationCard';
import SkeletonCard from '../../components/Reuseable/SkeletonCard';
import Pagination from '../../components/Reuseable/Pagination';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState('pending');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); 
    const [totalItems, setTotalItems] = useState(0); 

    useEffect(() => {
        fetchApplications();
    }, [currentTab, currentPage, itemsPerPage]);

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/hospitals/1/applications`, {
                params: {
                    status: currentTab,
                    page: currentPage,
                    per_page: itemsPerPage,
                },
            });

            if (response.data && typeof response.data.data === 'object') {
                const applicationsArray = Object.values(response.data.data);
                setApplications(applicationsArray); 
                setTotalItems(response.data.total);
            } else {
                setApplications([]); 
                setTotalItems(0);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch applications:", error);
            setIsLoading(false);
        }
    };

    const updateApplicationStatus = async (applicationId, status) => {
        try {
            await axiosInstance.put(`/applications/${applicationId}`, { status });
            fetchApplications(); 
        } catch (error) {
            console.error("Failed to update application status:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); 
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Hospital Applications</h1>
            <div className="tabs mb-4 flex justify-center space-x-4">
                <button 
                    className={`tab tab-bordered ${currentTab === 'pending' ? 'tab-active' : ''}`} 
                    onClick={() => setCurrentTab('pending')}
                >
                    Pending
                </button>
                <button 
                    className={`tab tab-bordered ${currentTab === 'accepted' ? 'tab-active' : ''}`} 
                    onClick={() => setCurrentTab('accepted')}
                >
                    Accepted
                </button>
                <button 
                    className={`tab tab-bordered ${currentTab === 'rejected' ? 'tab-active' : ''}`} 
                    onClick={() => setCurrentTab('rejected')}
                >
                    Rejected
                </button>
            </div>
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : (
                <>
                    {applications.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            No applications found for the {currentTab} tab.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {applications.map((application) => (
                                <ApplicationCard 
                                    key={application.id} 
                                    application={application} 
                                    updateApplicationStatus={updateApplicationStatus} 
                                />
                            ))}
                        </div>
                    )}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </>
            )}
        </div>
    );
}

export default Applications;
