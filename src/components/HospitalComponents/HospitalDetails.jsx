import { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios';
import SkeletonCard from '../Reuseable/SkeletonCard';
import Swal from 'sweetalert2';

const HospitalDetails = ({ hospitalId }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    });
    const [hospitalData, setHospitalData] = useState({ user: {} });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                const response = await axiosInstance.get(`/hospital/${hospitalId}`);
                setHospitalData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch hospital:', error);
                setError('Failed to fetch hospital data.');
                setIsLoading(false);
            }
        };
        
        if (hospitalId) {
            fetchHospital();
        }
    }, [hospitalId]);

    useEffect(() => {
        if (hospitalData && hospitalData.user) {
            setFormData({
                name: hospitalData.user.name || '',
                address: hospitalData.address || '',
                phone: hospitalData.user.phone || '',
                email: hospitalData.user.email || ''
            });
        }
    }, [hospitalData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .put(`/hospital/${hospitalId}`, formData)
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    title: 'Success!',
                    text: 'Hospital details updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch((error) => {
                console.error('Failed to update hospital:', error);
                setError('Failed to update hospital.');
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update hospital details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-48">
                <SkeletonCard />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Hospital Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>
                <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary-dark focus:outline-none">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default HospitalDetails;
