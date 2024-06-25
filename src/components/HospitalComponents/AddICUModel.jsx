import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addICU, updateICU } from '../../store/slices/HospitalSlice';
import EquipmentAutocomplete from './EquipmentAutocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AddICUModal = ({ showModal, handleCloseModal, hospitalId, errors, selectedICU }) => {
    const dispatch = useDispatch();
    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [formData, setFormData] = useState({
        hospital_id: hospitalId,
        capacity: '',
        equipments: [],
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (selectedICU) {
            setFormData({
                hospital_id: hospitalId,
                capacity: selectedICU.capacity,
                equipments: selectedICU.equipments.map(e => e.name),
            });
            setSelectedEquipments(selectedICU.equipments.map(e => e.id));
        } else {
            setFormData({
                hospital_id: hospitalId,
                capacity: '',
                equipments: [],
            });
            setSelectedEquipments([]);
        }
    }, [selectedICU, hospitalId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Validation logic
        const errors = {};
        if (formData.capacity < 0) {
            errors.capacity = 'Capacity must be a positive number or zero.';
        }
        if (selectedEquipments.length === 0) {
            errors.equipments = 'At least one equipment must be selected.';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const formDataWithEquipments = { ...formData, equipments: selectedEquipments };
        try {
            if (selectedICU) {
                await dispatch(updateICU({ id: selectedICU.id, data: formDataWithEquipments, hospitalId }));
            } else {
                await dispatch(addICU(formDataWithEquipments));
                setFormData({
                    hospital_id: hospitalId,
                    capacity: '',
                    equipments: [],
                });
                setSelectedEquipments([]);
            }
            console.log('ICU saved successfully:', formDataWithEquipments);
            
            handleCloseModal();
            
        } catch (error) {
            console.error('Failed to save ICU:', error);
        }
    };

    return (
        showModal && (
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{selectedICU ? 'Update ICU' : 'Add New ICU'}</h3>
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
                                value={formData.capacity}
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
                            <button type="submit" className="btn btn-info">
                                <FontAwesomeIcon icon={faSave} /> {selectedICU ? 'Save Changes' : 'Save'}
                            </button>
                            <button type="button" onClick={handleCloseModal} className="btn btn-secondary">
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
