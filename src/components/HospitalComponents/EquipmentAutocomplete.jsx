import { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const EquipmentAutocomplete = ({ selectedEquipments, setSelectedEquipments }) => {
    const [equipments, setEquipments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [validationError, setValidationError] = useState("");

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

    useEffect(() => {
        if (searchTerm) {
            const filtered = equipments.filter(equipment =>
                equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, equipments]);

    const handleAddEquipment = async (event) => {
        event.preventDefault(); // Prevent the form from submitting and closing the modal
        if (!/^[a-zA-Z]+$/.test(searchTerm)) {
            setValidationError("Equipment name must contain only alphabetic characters.");
            return;
        }
        try {
            const response = await axiosInstance.post("/equipment", { name: searchTerm });
            const newEquipment = response.data;
            setEquipments([...equipments, newEquipment]);
            setSelectedEquipments([...selectedEquipments, newEquipment.id]);
            setSearchTerm("");
            setValidationError("");
        } catch (error) {
            console.error("Failed to add equipment:", error);
        }
    };

    const handleSelectSuggestion = (equipmentId) => {
        if (!selectedEquipments.includes(equipmentId)) {
            setSelectedEquipments([...selectedEquipments, equipmentId]);
        }
        setSearchTerm("");
        setSuggestions([]);
    };

    const handleRemoveEquipment = (equipmentId) => {
        setSelectedEquipments(selectedEquipments.filter(id => id !== equipmentId));
    };

    return (
        <div>
            <div className="form-control">
                <input
                    type="text"
                    placeholder="Search for equipment"
                    className="input input-bordered"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {suggestions.length > 0 && (
                    <ul className="menu bg-base-100 w-full rounded-box mt-2 shadow-lg">
                        {suggestions.map((equipment) => (
                            <li
                                key={equipment.id}
                                className="menu-item cursor-pointer hover:bg-base-200"
                                onClick={() => handleSelectSuggestion(equipment.id)}
                            >
                                {equipment.name}
                            </li>
                        ))}
                    </ul>
                )}
                {searchTerm  && (
                    <button className="btn btn-outline btn-sm mt-2" onClick={handleAddEquipment}>
                        <FontAwesomeIcon icon={faPlus} /> Add "{searchTerm}"
                    </button>
                )}
                {validationError && (
                    <p className="text-red-500 text-xs mt-1">{validationError}</p>
                )}
            </div>
            <div className="flex flex-wrap mt-2">
                {selectedEquipments.map(equipmentId => {
                    const equipment = equipments.find(e => e.id === equipmentId);
                    return (
                        <div key={equipmentId} className="badge badge-lg   badge-ghost badge-outline">
                            {equipment?.name}
                            <button
                                type="button"
                                className="btn btn-xs  btn-circle btn-ghost ml-1  "
                                onClick={() => handleRemoveEquipment(equipmentId)}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EquipmentAutocomplete;