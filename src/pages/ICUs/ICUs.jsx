import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getICUs } from '../../store/slices/ICUSlice';
import { addApplication } from '../../store/slices/ApplicationSlice';
import ICUBookCard from '../../components/ICUComponents/ICUBookCard';
import ICUApplication from '../../components/ICUComponents/ICUApplication';
import Toast from '../../components/ICUComponents/Toast';

export default function ICUs() {
    const dispatch = useDispatch();
    const { ICUs, isLoading } = useSelector((state) => state.ICUs);
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
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState('success'); // 'success' or 'error'
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        dispatch(getICUs({ address }));
    }, [dispatch, address]);

    useEffect(() => {
        console.log("ICUs data:", ICUs);
    }, [ICUs]);

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
                    setToastType('success');
                    setToastMessage('ICU booked successfully!');
                    setShowToast(true);
                    handleCloseModal();
                })
                .catch((error) => {
                    console.log("errror" + error.response.data);
                    if (error.response && error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    } else {
                        setToastType('error');
                        setToastMessage('Error booking ICU. Please try again.');
                        setShowToast(true);
                    }
                });
        }
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Intensive Care Units</h1>
            <div className="mb-4">
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
                ICUs.map((icu, index) => (
                    <ICUBookCard key={index} icu={icu} onBookICU={handleBookICU} />
                ))
            )}

            <ICUApplication
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
                errors={errors}
            />

            <Toast showToast={showToast} toastType={toastType} toastMessage={toastMessage} />
        </div>
    );
}
