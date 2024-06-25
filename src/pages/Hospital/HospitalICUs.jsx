import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHospitalICUs, setCurrentPage } from '../../store/slices/HospitalSlice';
import ICUTable from '../../components/HospitalComponents/ICUTable';
import AddICUModal from '../../components/HospitalComponents/AddICUModel';
import HospitalDetails from '../../components/HospitalComponents/HospitalDetails';
import Swal from 'sweetalert2';

const HospitalICUs = () => {
                
    const loggedUser = useSelector((state) => state.auth.user);
    const hospitalId = loggedUser.id;
    const dispatch = useDispatch();
    const { hICUs, currentPage, totalPages, isLoading } = useSelector((state) => state.hospitals);
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

    const handleDeleteICU = (icu) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteICU({ id: icu.id, hospitalId }));
                Swal.fire('Deleted!', 'ICU has been deleted.', 'success');
            }
        });
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
                        <div></div>
                        <button onClick={handleAddICU} className="btn btn-info ">
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
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Capacity</th>
                                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase tracking-wider">Equipments</th>
                                                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {hICUs.map((icu, index) => (
                                                <ICUTable
                                                    key={index}
                                                    icu={icu}
                                                    onUpdate={handleUpdateICU}
                                                    onDelete={handleDeleteICU}
                                                    hospitalId={hospitalId}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
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
                                            className={`btn btn-xs ${currentPage === index + 1 ? 'btn-info' : 'btn-secondary'}`}
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
