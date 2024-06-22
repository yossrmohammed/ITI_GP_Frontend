import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addICU } from '../../store/slices/HospitalSlice';
import EquipmentAutocomplete from './EquipmentAutocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const AddICUModal = ({
    showModal,
    handleCloseModal,
    hospitalId,
    errors
}) => {
    const dispatch = useDispatch();
    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [formData, setFormData] = useState({
        hospital_id: hospitalId,
        capacity: '',
        equipments: [],
    });
    const [validationErrors, setValidationErrors] = useState({
        capacity: '',
        equipments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        let valid = true;
        let errors = { capacity: '', equipments: '' };

        if (formData.capacity <= 0) {
            errors.capacity = 'Capacity must be a positive number.';
            valid = false;
        }

        if (selectedEquipments.length === 0) {
            errors.equipments = 'At least one equipment must be selected.';
            valid = false;
        }

        setValidationErrors(errors);
        return valid;
    };

    const resetForm = () => {
        setSelectedEquipments([]);
        setFormData({
            hospital_id: hospitalId,
            capacity: '',
            equipments: [],
        });
        setValidationErrors({
            capacity: '',
            equipments: ''
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formDataWithEquipments = { ...formData, equipments: selectedEquipments };
        try {
            await dispatch(addICU(formDataWithEquipments));
            console.log('ICU added successfully:', formDataWithEquipments);
            handleCloseModal();
            resetForm(); // Reset the form after successful submission
        } catch (error) {
            console.error('Failed to add ICU:', error);
        }
    };

    const handleModalClose = () => {
        handleCloseModal();
        resetForm(); // Reset the form when modal is closed
    };

    return (
        showModal && (
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New ICU</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Capacity</span>
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                placeholder="Capacity"
                                className="input input-bordered"
                                required
                                onChange={handleChange}
                            />
                            {validationErrors.capacity && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.capacity}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Equipments</span>
                            </label>
                            <EquipmentAutocomplete
                                selectedEquipments={selectedEquipments}
                                setSelectedEquipments={setSelectedEquipments}
                            />
                            {validationErrors.equipments && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.equipments}</p>
                            )}
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">
                                <FontAwesomeIcon icon={faSave} /> Save
                            </button>
                            <button type="button" onClick={handleModalClose} className="btn btn-secondary">
                                <FontAwesomeIcon icon={faTimes} /> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default AddICUModal;