import React from 'react';

const ICUApplication = ({
    showModal,
    handleCloseModal,
    handleSubmit,
    handleChange,
    formData,
    errors,
}) => (
    showModal && (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Book ICU</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="patient_name" className="label">
                            <span className="label-text">Patient Name</span>
                        </label>
                        <input
                            type="text"
                            id="patient_name"
                            name="patient_name"
                            value={formData.patient_name}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                        {errors.patient_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.patient_name}</p>
                        )}
                    </div>
                    <div className="form-control">
                        <label htmlFor="patient_phone" className="label">
                            <span className="label-text">Patient Phone</span>
                        </label>
                        <input
                            type="text"
                            id="patient_phone"
                            name="patient_phone"
                            value={formData.patient_phone}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                        {errors.patient_phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.patient_phone}</p>
                        )}
                    </div>
                    <div className="form-control">
                        <label htmlFor="description" className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered"
                            required
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                        )}
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-info">Submit</button>
                        <button type="button" onClick={handleCloseModal} className="btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
);

export default ICUApplication;
