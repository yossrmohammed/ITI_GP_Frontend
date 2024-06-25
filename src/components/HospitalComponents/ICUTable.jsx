import { useDispatch } from 'react-redux';
import { deleteICU } from '../../store/slices/HospitalSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ICUTable = ({ icu, onUpdate, hospitalId }) => {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteICU({ id, hospitalId }));
    };

    const handleUpdate = () => {
        onUpdate(icu);
    };

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-lg font-bold">{icu.id}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base">{icu.capacity}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm">{icu.equipments.map(e => e.name).join(', ')}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={handleUpdate} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <FontAwesomeIcon icon={faEdit} /> Update
                </button>
                <button onClick={() => document.getElementById('my_modal_1').showModal()} className="text-red-600 hover:text-red-900">
                    <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete ICU</h3>
                        <p className="py-4">Are you sure you want to delete ICU {icu.id}?</p>
                        <div className="modal-action">
                            <button onClick={() => handleDelete(icu.id)} className="btn btn-danger">
                                <FontAwesomeIcon icon={faTrash} /> Yes
                            </button>
                            <button onClick={() => document.getElementById('my_modal_1').close()} className="btn">No</button>
                        </div>
                    </div>
                </dialog>
            </td>
        </tr>
    );
};

export default ICUTable;
