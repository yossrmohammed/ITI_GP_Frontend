import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHospitalICUs } from '../../store/slices/HospitalSlice';
import ICUCard from '../../components/HospitalComponents/ICUCard';
import { Link } from 'react-router-dom';
import AddICUModal from '../../components/HospitalComponents/AddICUModel';

const HospitalICUs = () => {
    const dispatch = useDispatch();
    const { ICUs, isLoading } = useSelector((state) => state.ICUs);
    const [hospitalId, setHospitalId] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedICU, setSelectedICU] = useState(null);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        dispatch(getHospitalICUs(hospitalId));
    }, [dispatch, hospitalId]);

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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Intensive Care Units</h1>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ICUs.map((icu, index) => (
                        <ICUCard key={index} icu={icu} onUpdate={handleUpdateICU} />
                    ))}
                </div>
            )}
            <AddICUModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                hospitalId={hospitalId}
                errors={errors}
                selectedICU={selectedICU}
            />
        </div>
    );
};

export default HospitalICUs;
