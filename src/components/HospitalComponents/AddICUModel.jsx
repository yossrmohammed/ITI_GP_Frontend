import { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios';
import { useDispatch } from 'react-redux';
import { addICU } from '../../store/slices/HospitalSlice';

const AddICUModal = ({
    showModal,
    handleCloseModal,
    hospitalId,
    errors
}) => {
    const dispatch = useDispatch();
    const [equipments, setEquipments] = useState([]);
    let [selectedEquipments, setSelectedEquipments] = useState([]);
    const [formData, setFormData] = useState({
        hospital_id: hospitalId,
        capacity: '',
        equipments: [],
    });

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const response = await axiosInstance.get("/equipment");
                setEquipments(response.data);
            } catch (error) {
                console.error("Failed to fetch equipments:", error);
            }
        };

        fetchEquipments();
    }, []);

    const handleEquipmentChange = (event) => {
        const selectedOptions = Array.from(event.target.value)
        //const selectedEquipment = selectedOptions.map(option => option.value);
       let selectedEquipment=selectedOptions.pop();
        setSelectedEquipments([...selectedEquipments, selectedEquipment]);
        setFormData({ ...formData, equipments: selectedEquipments });
    };

    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, capacity: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(addICU(formData));
            console.log('ICU added successfully:', formData);
            handleCloseModal();
        } catch (error) {
            console.error('Failed to add ICU:', error);
        }
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
                            {errors.capacity && (
                                <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Equipments</span>
                            </label>
                            <select
                                
                                name="equipments"
                                onChange={handleEquipmentChange}
                                className="select select-bordered"
                                required
                            >
                                <option value="">Select Equipment</option>
                                {equipments.map((equipment) => (
                                    <option key={equipment.id} value={equipment.id}>
                                        {equipment.id}
                                    </option>
                                ))}
                            </select>
                            {errors.equipments && (
                                <p className="text-red-500 text-xs mt-1">{errors.equipments}</p>
                            )}
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" onClick={handleCloseModal} className="btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default AddICUModal;
