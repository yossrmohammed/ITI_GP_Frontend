import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from '../../axios'; // Import your axios instance
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/auth/authSlice';
import debounce from 'lodash.debounce';

const PrescriptionUpload = ({ triggerNextStep }) => {
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [doctorName, setDoctorName] = useState('');
  const [city, setCity] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = useSelector(selectUser);


  const fetchDoctors = async (name, city, specialization) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/doctors', {
        params: { name, city, specialization },
      });
      setDoctors(response.data.data);
      setError('');
    } catch (error) {
      setError('Error fetching doctors. Please try again.');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchDoctors = useCallback(debounce(fetchDoctors, 500), []);

  useEffect(() => {
    if (doctorName.trim() || city.trim() || specialization.trim()) {
      debouncedFetchDoctors(doctorName.trim(), city.trim(), specialization.trim());
    } else {
      setDoctors([]);
    }
  }, [doctorName, city, specialization, debouncedFetchDoctors]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setPrescriptionImage(file);
    setError(''); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user?.role !== 'patient') {
      setError('Please log in as patient to upload your prescription.');
      return;
    }

    if (!prescriptionImage) {
      setError('Please upload a prescription image.');
      return;
    }

    if (doctors.length !== 1 && (!doctorName.trim() || !city.trim() || !specialization.trim())) {
      setError('Please provide the doctor\'s name, city, and specialization.');
      return;
    }

    if (doctors.length !== 1) {
      setError(doctors.length === 0 ? 'No doctors found. Please try again.' : 'Multiple doctors found. Please refine your search.');
      return;
    }

    const formData = new FormData();
    formData.append('prescription_image', prescriptionImage);
    formData.append('doctor_id', doctors[0].id);
    formData.append('doctorName', doctors[0].name);

    try {
      const response = await axiosInstance.post(`/patients/${user.id}/prescription`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Prescription uploaded successfully!');

      triggerNextStep();
    } catch (error) {
      console.error('Error uploading prescription:', error);

      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        const errorMessages = Object.values(serverErrors).flat().join(', ');
        setError(`Error uploading prescription: ${errorMessages}`);
      } else {
        setError('Error uploading prescription. Please try again.');
      }
    }
  };

  if (!user) {
    return <p>Please log in to upload your prescription.</p>;
  }

  if (user?.role !== 'patient') {
    return <p>Please log in as a patient to upload your prescription.</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Upload Prescription Image:
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </label>
        <br />
        <label>
          Doctor's Name:
          <input
            type="text"
            value={doctors.length === 1 ? doctors[0].name : doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            disabled={doctors.length === 1}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            value={doctors.length === 1 ? doctors[0].city : city}
            onChange={(e) => setCity(e.target.value)}
            disabled={doctors.length === 1}
          />
        </label>
        <br />
        <label>
          Specialization:
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            disabled={doctors.length === 1}
          />
        </label>
        <br />
        {loading ? (
          <p>Loading doctors...</p>
        ) : (
          <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {doctors.length === 1 && <button type="submit">Upload Prescription</button>}
            {doctors.length === 0 && !error && <p>No doctors found. Please try again.</p>}
            {doctors.length > 1 && !error && <p>Multiple doctors found. Please refine your search.</p>}
          </>
        )}
      </form>
    </div>
  );
};

PrescriptionUpload.propTypes = {
  triggerNextStep: PropTypes.func.isRequired,
};

export default PrescriptionUpload;
