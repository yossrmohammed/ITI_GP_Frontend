import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getICUs, setItemsPerPage } from '../../store/slices/ICUSlice';
import ICUBookCard from '../../components/ICUComponents/ICUBookCard';
import ICUApplication from '../../components/ICUComponents/ICUApplication';
import Swal from 'sweetalert2';
import { addApplication } from '../../store/slices/ApplicationSlice';
const ICUs = () => {
    const dispatch = useDispatch();
    const { ICUs, isLoading, currentPage, totalPages, itemsPerPage } = useSelector((state) => state.ICUs);
    const [showModal, setShowModal] = useState(false);
    const [selectedICU, setSelectedICU] = useState(null);
    const [formData, setFormData] = useState({
        patient_name: '',
        patient_phone: '',
        description: '',
        intensive_care_unit_id: '',
    });
    const [errors, setErrors] = useState({});
    const [address, setAddress] = useState('');

    const [toastMessage, setToastMessage] = useState('');

    // Define options for items per page dropdown
    const itemsPerPageOptions = [5, 10, 20, 50];

    useEffect(() => {
        fetchICUs();
    }, [dispatch, address, currentPage, itemsPerPage]);

    const fetchICUs = () => {
        dispatch(getICUs({ address, page: currentPage, itemsPerPage }));
    };

    const handleBookICU = (icu) => {
        setSelectedICU(icu);
        setFormData((prevState) => ({
            ...prevState,
            intensive_care_unit_id: icu.id,
        }));
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedICU(null);
        setFormData({
            patient_name: '',
            patient_phone: '',
            description: '',
            intensive_care_unit_id: '',
        });
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.patient_name) newErrors.patient_name = "Patient Name is required";
        if (!formData.patient_phone) {
            newErrors.patient_phone = "Patient Phone is required";
        } else if (!/^(010|011|012|015)[0-9]{8}$/.test(formData.patient_phone)) {
            newErrors.patient_phone = "Patient Phone must be a valid Egyptian mobile number";
        }
        if (!formData.description) newErrors.description = "Description is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            dispatch(addApplication(formData))
                .then(() => {
                    handleCloseModal();
                   
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'ICU booked successfully!',
                    });
                })
                .catch((error) => {
                    console.log("Error:", error.response.data);
                    if (error.response && error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    } else {
                        setToastMessage('Error booking ICU. Please try again.');
                        
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Error booking ICU. Please try again.',
                        });
                    }
                });
        }
    };
    

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePageChange = (page) => {
        dispatch(getICUs({ address, page, itemsPerPage }));
    };

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        dispatch(setItemsPerPage(newItemsPerPage));
        fetchICUs();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Intensive Care Units</h1>
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Filter by hospital address"
                    value={address}
                    onChange={handleAddressChange}
                    className="input input-bordered w-full"
                />
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ICUs.map((icu, index) => (
                        <ICUBookCard key={index} icu={icu} onBookICU={handleBookICU} />
                    ))}
                </div>
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <span>Show:</span>
                            <select
                                className="ml-2 border rounded p-1"
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                            >
                                {itemsPerPageOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <span>items per page</span>
                        </div>
                        <div className="flex space-x-1">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`btn btn-xs ${currentPage === index + 1 ? 'btn-info' : 'btn-secondary'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <ICUApplication
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
                errors={errors}
            />
        </div>
    );
};

export default ICUs;
