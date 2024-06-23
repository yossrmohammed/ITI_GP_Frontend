import { useDispatch } from 'react-redux';
import { deleteICU } from '../../store/slices/HospitalSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ICUCard = ({ icu, onUpdate }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await dispatch(deleteICU(icu.id));
        } catch (error) {
            console.error('Failed to delete ICU:', error);
        }
    };

    const handleUpdate = () => {
        onUpdate(icu);
    };

    return (
        <div className="card bg-white shadow-xl rounded-lg mb-4">
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold text-gray-800">ICU {icu.id}</h2>
                <p className="text-base text-gray-600 mb-4">Capacity: {icu.capacity}</p>
                <p className="text-sm text-gray-600 mb-4">Equipments: {icu.equipments.map(e => e.name).join(', ')}</p>
                <div className="card-actions flex justify-end">
                    <button onClick={handleUpdate} className="btn btn-secondary mr-2">
                        <FontAwesomeIcon icon={faEdit} /> Update
                    </button>
                    <button onClick={handleDelete} className="btn btn-danger">
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ICUCard;
