
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHospitalICUs } from '../../store/slices/HospitalSlice';
import ICUCard from '../../components/HospitalComponents/ICUCard';
import { Link } from 'react-router-dom';
import AddICUModal from '../../components/HospitalComponents/AddICUModel';

export default function HospitalICUs() {
    const dispatch = useDispatch();
    const { ICUs, isLoading } = useSelector((state) => state.ICUs);
    const [hospitalId, setHospitalId] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedICU, setSelectedICU] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getHospitalICUs(hospitalId));
    }, [dispatch, hospitalId]);

    useEffect(() => {
        console.log("ICUs data:", ICUs);
    }, [ICUs]);

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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Intensive Care Units</h1>
            <div className="mb-4">
                <Link to={'/application'} className="btn btn-secondary mr-2">
                    Get All Applications
                </Link>
                <button onClick={handleAddICU} className="btn btn-primary">
                    Add New ICU
                </button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                ICUs.map((icu, index) => (
                    <ICUCard key={index} icu={icu} onUpdate={handleUpdateICU} />
                ))
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
}
