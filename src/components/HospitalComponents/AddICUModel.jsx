import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addICU, updateICU } from '../../store/slices/HospitalSlice';
import EquipmentAutocomplete from './EquipmentAutocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance } from '../../axios';

const AddICUModal = ({ showModal, setColseModel, hospitalId, selectedICU }) => {
    const dispatch = useDispatch();
    const [selectedEquipments, setSelectedEquipments] = useState({});
    const [formData, setFormData] = useState({
        hospital_id: hospitalId,
        capacity: '',
        code: '',
        equipments: [],
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (selectedICU) {
            setFormData({
                hospital_id: hospitalId,
                capacity: selectedICU.capacity,
                code: selectedICU.code,
                equipments: selectedICU.equipments.map(e => e.name),
            });
            setSelectedEquipments(selectedICU.equipments.map(e => e.id));
        } else {
            setFormData({
                hospital_id: hospitalId,
                capacity: '',
                code: '',
                equipments: [],
            });
            setSelectedEquipments([]);
        }
    }, [selectedICU, hospitalId]);
    const handleCloseModal = () => {
        setFormData({
            hospital_id: hospitalId,
            capacity: '',
            code: '',
            equipments: [],
        });
        setValidationErrors({});
        setSelectedEquipments([]);
        setColseModel(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setValidationErrors({}); 
        let response
        const formDataWithEquipments = { ...formData, equipments: selectedEquipments };
       
            if (selectedICU) {
              response= await dispatch(updateICU({ id: selectedICU.id, data: formDataWithEquipments, hospitalId }));
              console.log(response)
                if(response.error){
                    setValidationErrors(response.payload.errors);
                }
                else{
                    setFormData({
                        hospital_id: hospitalId,
                        capacity: '',
                        code: '',
                        equipments: [],
                    });
                    setSelectedEquipments([]);
                    
                    setValidationErrors({});
                    handleCloseModal();
                }
            } else {
                response = await dispatch(addICU(formDataWithEquipments));
                if(response.error){
                    setValidationErrors(response.payload.errors);
                }
                else{
                    setFormData({
                        hospital_id: hospitalId,
                        capacity: '',
                        code: '',
                        equipments: [],
                    });
                    setSelectedEquipments([]);
                    
                    setValidationErrors({});
                    handleCloseModal();
                }
                
  
                
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
                                <span className="label-text">Code</span>
                            </label>
                            <input
                                type="text"
                                name="code"
                                placeholder="Code"
                                className="input input-bordered"
                                value={formData.code}
                                required
                                onChange={handleChange}
                            />
                            {validationErrors.code && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.code}</p>
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
                            <button type="button" onClick={handleCloseModal} className="btn btn-natural">
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
