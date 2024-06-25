import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHospitalICUs, setCurrentPage } from '../../store/slices/HospitalSlice';
import ICUCard from '../../components/HospitalComponents/ICUCard';
import { Link } from 'react-router-dom';
import AddICUModal from '../../components/HospitalComponents/AddICUModel';
import HospitalDetails from '../../components/HospitalComponents/HospitalDetails';

const HospitalICUs = () => {
    const dispatch = useDispatch();
    const { hICUs, currentPage, totalPages, isLoading } = useSelector((state) => state.hospitals);
    const [hospitalId, setHospitalId] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedICU, setSelectedICU] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getHospitalICUs({ hospitalId, page: currentPage, itemsPerPage }));
    }, [dispatch, hospitalId, currentPage, itemsPerPage]);

    const handleAddICU = () => {
        setSelectedICU(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateICU = (icu) => {
        setSelectedICU(icu);
        setShowModal(true);
    };

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    const handleItemsPerPageChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setItemsPerPage(value);
        dispatch(setCurrentPage(1));
        dispatch(getHospitalICUs({ hospitalId, page: 1, itemsPerPage: value }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Intensive Care Units</h1>
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/3 px-4 mb-4">
                    <HospitalDetails hospitalId={hospitalId} />
                </div>
                <div className="w-full md:w-2/3 px-4 mb-4">
                    <div className="mb-4 flex justify-between items-center">
                        <Link to={'/application'} className="btn btn-secondary">
                            Get All Applications
                        </Link>
                        <button onClick={handleAddICU} className="btn btn-primary">
                            Add New ICU
                        </button>
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <span className="loading loading-dots"></span>
                        </div>
                    ) : (
                        <>
                            {hICUs.length === 0 ? (
                                <div className="text-center text-gray-500 mt-8">
                                    No ICUs found.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {hICUs.map((icu, index) => (
                                        <ICUCard
                                            key={index}
                                            icu={icu}
                                            onUpdate={handleUpdateICU}
                                            hospitalId={hospitalId}
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center">
                                    <span>Show:</span>
                                    <select
                                        className="ml-2 border rounded p-1"
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                    <span>items per page</span>
                                </div>
                                <div className="flex space-x-1">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`btn btn-xs ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    <AddICUModal
                        showModal={showModal}
                        handleCloseModal={handleCloseModal}
                        hospitalId={hospitalId}
                        errors={errors}
                        selectedICU={selectedICU}
                    />
                </div>
            </div>
        </div>
    );
};

export default HospitalICUs;
